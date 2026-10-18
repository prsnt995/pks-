import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  Company,
  Project,
  Video,
  VideoGenerationJob,
  SiteSettings,
  ContactMessage,
  ServiceItem
} from '@/types';
import {
  INITIAL_COMPANIES,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_VIDEOS
} from './data/initial-data';
import { createClient } from '@supabase/supabase-js';

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isServerless
  ? path.join('/tmp', '.data')
  : path.join(process.cwd(), '.data');

function ensureDataDir(): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    return true;
  } catch {
    return false;
  }
}

function readJsonFile<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      if (ensureDataDir()) {
        try {
          fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
        } catch {
          // Read-only filesystem fallback
        }
      }
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (err) {
    console.warn(`Could not read ${filename}, using default:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  try {
    if (!ensureDataDir()) return;
    const filePath = path.join(DATA_DIR, filename);
    const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
    fs.writeFileSync(temporaryPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(temporaryPath, filePath);
  } catch (err) {
    console.warn(`Could not write ${filename}:`, err);
  }
}

// Supabase client instance (server-side only if configured)
function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key && url.startsWith('http') && !url.includes('your-project')) {
    return createClient(url, key);
  }
  return null;
}

// ==========================================
// COMPANIES
// ==========================================
export async function getCompanies(): Promise<Company[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        const slugs = new Set(data.map((c) => c.slug.toLowerCase()));
        const missing = INITIAL_COMPANIES.filter((c) => !slugs.has(c.slug.toLowerCase()));
        return [...data, ...missing].sort((a, b) => a.display_order - b.display_order);
      }
    } catch {
      // Fallback to local storage
    }
  }
  const companies = readJsonFile<Company[]>('companies.json', INITIAL_COMPANIES);
  const slugs = new Set(companies.map((c) => c.slug.toLowerCase()));
  const missing = INITIAL_COMPANIES.filter((c) => !slugs.has(c.slug.toLowerCase()));
  return [...companies, ...missing].sort((a, b) => a.display_order - b.display_order);
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const companies = await getCompanies();
  const normalized = slug.toLowerCase();

  // Resolve legacy aliases
  let targetSlug = normalized;
  if (normalized === 'nextepstudio') targetSlug = 'nextep';
  if (normalized === 'pks-eng') targetSlug = 'rozena';
  if (normalized === 'to-be-announced') targetSlug = 'noeul';

  const found = companies.find(
    (c) =>
      c.slug.toLowerCase() === targetSlug ||
      c.slug.toLowerCase() === normalized ||
      (normalized === 'nextep' && (c.slug === 'nextepstudio' || c.slug === 'nextep'))
  );
  if (found) return found;

  return (
    INITIAL_COMPANIES.find(
      (c) =>
        c.slug.toLowerCase() === targetSlug ||
        c.slug.toLowerCase() === normalized ||
        (normalized === 'nextep' && (c.slug === 'nextepstudio' || c.slug === 'nextep'))
    ) || null
  );
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const companies = await getCompanies();
  return companies.find((c) => c.id === id) || null;
}

export async function saveCompany(companyData: Partial<Company> & { id?: string; name: string }): Promise<Company> {
  const companies = await getCompanies();
  const now = new Date().toISOString();

  let targetId = companyData.id;
  if (!targetId) {
    targetId = 'comp_' + Math.random().toString(36).substring(2, 9);
  }

  const existingIndex = companies.findIndex((c) => c.id === targetId);

  const updatedCompany: Company = {
    id: targetId,
    name: companyData.name,
    slug: companyData.slug || companyData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: companyData.category || 'General',
    description: companyData.description || '',
    logo_url: companyData.logo_url || '',
    official_url: companyData.official_url || '',
    website_verified: Boolean(companyData.website_verified),
    display_order: companyData.display_order ?? (existingIndex >= 0 ? companies[existingIndex].display_order : companies.length + 1),
    is_active: companyData.is_active !== undefined ? companyData.is_active : true,
    brand_color: companyData.brand_color || '#3B82F6',
    hero_image_url: companyData.hero_image_url || '',
    highlights: companyData.highlights || [],
    created_at: existingIndex >= 0 ? companies[existingIndex].created_at : now,
    updated_at: now
  };

  if (existingIndex >= 0) {
    companies[existingIndex] = updatedCompany;
  } else {
    companies.push(updatedCompany);
  }

  writeJsonFile('companies.json', companies);

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from('companies').upsert(updatedCompany);
    } catch (err) {
      console.warn('Supabase upsert failed, preserved locally:', err);
    }
  }

  return updatedCompany;
}

export async function deleteCompany(id: string): Promise<boolean> {
  let companies = await getCompanies();
  companies = companies.filter((c) => c.id !== id);
  writeJsonFile('companies.json', companies);

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from('companies').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete failed:', err);
    }
  }
  return true;
}

// ==========================================
// PROJECTS
// ==========================================
export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Project[];
    } catch {
      // Fallback
    }
  }
  const projects = readJsonFile<Project[]>('projects.json', INITIAL_PROJECTS);
  if (!projects || projects.length === 0) return INITIAL_PROJECTS;
  return projects;
}

export async function saveProject(project: Partial<Project> & { title: string; company_id: string }): Promise<Project> {
  const projects = await getProjects();
  const companies = await getCompanies();
  const company = companies.find((c) => c.id === project.company_id);

  const now = new Date().toISOString();
  const id = project.id || 'proj_' + Math.random().toString(36).substring(2, 9);
  const existingIdx = projects.findIndex((p) => p.id === id);

  const updated: Project = {
    id,
    company_id: project.company_id,
    company_name: company?.name || project.company_name || 'Nexora Portfolio',
    title: project.title,
    category: project.category || 'Venture Project',
    description: project.description || '',
    image_url: project.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    project_url: project.project_url || '',
    is_featured: project.is_featured ?? true,
    tags: project.tags || ['Showcase'],
    is_demo: project.is_demo ?? true,
    created_at: existingIdx >= 0 ? projects[existingIdx].created_at : now
  };

  if (existingIdx >= 0) {
    projects[existingIdx] = updated;
  } else {
    projects.push(updated);
  }

  writeJsonFile('projects.json', projects);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  let projects = await getProjects();
  projects = projects.filter((p) => p.id !== id);
  writeJsonFile('projects.json', projects);
  return true;
}

// ==========================================
// VIDEOS & LIBRARY
// ==========================================
export async function getVideos(): Promise<Video[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Video[];
    } catch {
      // Fallback
    }
  }
  return readJsonFile<Video[]>('videos.json', INITIAL_VIDEOS);
}

export async function getVideoById(id: string): Promise<Video | null> {
  const videos = await getVideos();
  return videos.find((v) => v.id === id) || null;
}

export async function saveVideo(video: Partial<Video> & { title: string; company_id: string; video_url: string }): Promise<Video> {
  const videos = await getVideos();
  const companies = await getCompanies();
  const company = companies.find((c) => c.id === video.company_id);

  const now = new Date().toISOString();
  const id = video.id || 'vid_' + Math.random().toString(36).substring(2, 9);
  const existingIdx = videos.findIndex((v) => v.id === id);

  const updated: Video = {
    id,
    company_id: video.company_id,
    company_name: company?.name || video.company_name || 'Nexora Group',
    title: video.title,
    description: video.description || '',
    provider: video.provider || 'mock',
    provider_job_id: video.provider_job_id || '',
    video_url: video.video_url,
    storage_path: video.storage_path || '',
    thumbnail_url: video.thumbnail_url || '',
    aspect_ratio: video.aspect_ratio || '16:9',
    duration_seconds: video.duration_seconds || 5,
    status: video.status || 'completed',
    purpose: video.purpose || 'brand_campaign',
    prompt: video.prompt || '',
    is_featured: video.is_featured ?? false,
    is_public: video.is_public ?? true,
    created_at: existingIdx >= 0 ? videos[existingIdx].created_at : now,
    updated_at: now
  };

  if (existingIdx >= 0) {
    videos[existingIdx] = updated;
  } else {
    videos.unshift(updated);
  }

  writeJsonFile('videos.json', videos);

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from('videos').upsert(updated);
    } catch (err) {
      console.warn('Supabase video upsert failed:', err);
    }
  }

  return updated;
}

export async function deleteVideo(id: string): Promise<boolean> {
  let videos = await getVideos();
  videos = videos.filter((v) => v.id !== id);
  writeJsonFile('videos.json', videos);

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from('videos').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase video delete failed:', err);
    }
  }
  return true;
}

// ==========================================
// VIDEO GENERATION JOBS
// ==========================================
export async function getVideoJobs(): Promise<VideoGenerationJob[]> {
  return readJsonFile<VideoGenerationJob[]>('video_jobs.json', []);
}

export async function getVideoJobById(id: string): Promise<VideoGenerationJob | null> {
  const jobs = await getVideoJobs();
  return jobs.find((j) => j.id === id) || null;
}

export async function saveVideoJob(job: VideoGenerationJob): Promise<VideoGenerationJob> {
  const jobs = await getVideoJobs();
  const existingIdx = jobs.findIndex((j) => j.id === job.id);
  job.updated_at = new Date().toISOString();

  if (existingIdx >= 0) {
    jobs[existingIdx] = job;
  } else {
    jobs.unshift(job);
  }

  writeJsonFile('video_jobs.json', jobs);
  return job;
}

// ==========================================
// SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  return readJsonFile<SiteSettings>('settings.json', INITIAL_SETTINGS);
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    updated_at: new Date().toISOString()
  };
  writeJsonFile('settings.json', updated);
  return updated;
}

// ==========================================
// SERVICES
// ==========================================
export async function getServices(): Promise<ServiceItem[]> {
  const services = readJsonFile<ServiceItem[]>('services.json', INITIAL_SERVICES);
  return services.sort((a, b) => a.display_order - b.display_order);
}

export async function saveService(service: Partial<ServiceItem> & { title: string }): Promise<ServiceItem> {
  const services = await getServices();
  const id = service.id || 'serv_' + Math.random().toString(36).substring(2, 9);
  const existingIdx = services.findIndex((s) => s.id === id);

  const updated: ServiceItem = {
    id,
    title: service.title,
    category: service.category || 'Corporate Service',
    description: service.description || '',
    icon: service.icon || 'Cpu',
    deliverables: service.deliverables || [],
    is_active: service.is_active ?? true,
    display_order: service.display_order ?? (existingIdx >= 0 ? services[existingIdx].display_order : services.length + 1)
  };

  if (existingIdx >= 0) {
    services[existingIdx] = updated;
  } else {
    services.push(updated);
  }

  writeJsonFile('services.json', services);
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  let services = await getServices();
  services = services.filter((s) => s.id !== id);
  writeJsonFile('services.json', services);
  return true;
}

// ==========================================
// CONTACT MESSAGES
// ==========================================
export async function getContactMessages(): Promise<ContactMessage[]> {
  return readJsonFile<ContactMessage[]>('contact_messages.json', []);
}

export async function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): Promise<ContactMessage> {
  const messages = await getContactMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: 'msg_' + Math.random().toString(36).substring(2, 10),
    status: 'unread',
    created_at: new Date().toISOString()
  };
  messages.unshift(newMsg);
  writeJsonFile('contact_messages.json', messages);
  return newMsg;
}

export async function updateContactMessageStatus(id: string, status: 'unread' | 'read' | 'archived'): Promise<boolean> {
  const messages = await getContactMessages();
  const target = messages.find((m) => m.id === id);
  if (target) {
    target.status = status;
    writeJsonFile('contact_messages.json', messages);
    return true;
  }
  return false;
}
