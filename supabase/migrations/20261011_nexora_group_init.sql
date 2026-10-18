-- ==============================================================================
-- NEXORA GROUP: Production Database Schema & Security Policies
-- Phase 6 Migration Script for Supabase / PostgreSQL
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS public.companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  logo_url TEXT DEFAULT '',
  official_url TEXT DEFAULT '',
  website_verified BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  brand_color TEXT DEFAULT '#3B82F6',
  hero_image_url TEXT DEFAULT '',
  highlights TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for ordering & slug lookup
CREATE INDEX IF NOT EXISTS idx_companies_slug ON public.companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_display_order ON public.companies(display_order);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  company_id TEXT REFERENCES public.companies(id) ON DELETE CASCADE,
  company_name TEXT DEFAULT '',
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  project_url TEXT DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  is_demo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_company_id ON public.projects(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured);

-- 4. Videos Table (Library)
CREATE TABLE IF NOT EXISTS public.videos (
  id TEXT PRIMARY KEY,
  company_id TEXT REFERENCES public.companies(id) ON DELETE CASCADE,
  company_name TEXT DEFAULT '',
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  provider TEXT NOT NULL DEFAULT 'mock',
  provider_job_id TEXT DEFAULT '',
  video_url TEXT NOT NULL,
  storage_path TEXT DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  aspect_ratio TEXT NOT NULL DEFAULT '16:9',
  duration_seconds INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'completed',
  purpose TEXT NOT NULL DEFAULT 'brand_campaign',
  prompt TEXT DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_videos_company_id ON public.videos(company_id);
CREATE INDEX IF NOT EXISTS idx_videos_purpose ON public.videos(purpose);
CREATE INDEX IF NOT EXISTS idx_videos_status ON public.videos(status);

-- 5. Video Generation Jobs Table
CREATE TABLE IF NOT EXISTS public.video_generation_jobs (
  id TEXT PRIMARY KEY,
  company_id TEXT REFERENCES public.companies(id) ON DELETE CASCADE,
  company_name TEXT DEFAULT '',
  video_id TEXT REFERENCES public.videos(id) ON DELETE SET NULL,
  provider TEXT NOT NULL,
  provider_job_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  purpose TEXT NOT NULL,
  aspect_ratio TEXT NOT NULL DEFAULT '16:9',
  duration_seconds INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'queued',
  progress_percent INTEGER DEFAULT 0,
  error_message TEXT DEFAULT '',
  result_video_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.video_generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_provider ON public.video_generation_jobs(provider, provider_job_id);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  hero_headline TEXT NOT NULL DEFAULT 'One Vision. Multiple Ventures.',
  hero_subheadline TEXT NOT NULL DEFAULT 'Building What''s Next.',
  hero_description TEXT NOT NULL DEFAULT 'Discover the companies, ideas, and digital experiences shaping our next chapter.',
  about_story TEXT NOT NULL DEFAULT '',
  about_mission TEXT NOT NULL DEFAULT '',
  about_vision TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT 'contact@nexoragroup.com',
  contact_location TEXT NOT NULL DEFAULT 'Global Digital Presence & Regional Operations',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT DEFAULT '',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);

-- 8. Row Level Security (RLS) Policies
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public can read active companies, projects, public videos, and site settings
CREATE POLICY "Public can view active companies"
  ON public.companies FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Public can view public videos"
  ON public.videos FOR SELECT
  USING (is_public = true AND status = 'completed');

CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Public can submit contact messages
CREATE POLICY "Public can insert contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- Service role has full access to all tables
-- (Supabase service role automatically bypasses RLS)
