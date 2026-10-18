export type AspectRatio = '16:9' | '9:16' | '1:1';

export type VideoPurpose =
  | 'company_intro'
  | 'product_ad'
  | 'social_reel'
  | 'brand_campaign'
  | 'hero_bg'
  | 'promotional';

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface CompanyService {
  title: string;
  description: string;
  badge?: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  vision?: string;
  tagline?: string;
  korean_tagline?: string;
  cta_text?: string;
  logo_url?: string;
  official_url?: string;
  website_verified: boolean;
  display_order: number;
  is_active: boolean;
  brand_color?: string;
  hero_image_url?: string;
  highlights?: string[];
  services_list?: CompanyService[];
  expertise?: string[];
  founded_year?: string;
  location?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  company_id: string;
  company_name?: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  project_url?: string;
  is_featured: boolean;
  tags: string[];
  is_demo: boolean;
  created_at: string;
}

export interface Video {
  id: string;
  company_id: string;
  company_name?: string;
  title: string;
  description: string;
  provider: 'luma' | 'fal' | 'replicate' | 'mock' | 'manual';
  provider_job_id?: string;
  video_url: string;
  storage_path?: string;
  thumbnail_url?: string;
  aspect_ratio: AspectRatio;
  duration_seconds: number;
  status: JobStatus;
  purpose: VideoPurpose;
  prompt?: string;
  is_featured: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoGenerationJob {
  id: string;
  company_id: string;
  company_name?: string;
  video_id?: string;
  provider: 'luma' | 'fal' | 'replicate' | 'mock';
  provider_job_id: string;
  prompt: string;
  purpose: VideoPurpose;
  aspect_ratio: AspectRatio;
  duration_seconds: number;
  status: JobStatus;
  progress_percent?: number;
  error_message?: string;
  result_video_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  deliverables: string[];
  is_active: boolean;
  display_order: number;
}

export interface SiteSettings {
  id?: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_description: string;
  about_story: string;
  about_mission: string;
  about_vision: string;
  contact_email: string;
  contact_location: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

export interface GenerationRequestPayload {
  company_id: string;
  prompt: string;
  purpose: VideoPurpose;
  aspect_ratio: AspectRatio;
  duration_seconds: number;
  image_url?: string;
  title?: string;
}
