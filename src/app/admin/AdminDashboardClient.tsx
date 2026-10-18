'use client';

import { useState } from 'react';
import {
  Company,
  Project,
  ServiceItem,
  SiteSettings,
  ContactMessage,
  VideoGenerationJob
} from '@/types';
import {
  Building2,
  FileText,
  Briefcase,
  Layers,
  Sparkles,
  Inbox,
  LogOut,
  Plus,
  Save,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Globe
} from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardProps {
  initialCompanies: Company[];
  initialSettings: SiteSettings;
  initialProjects: Project[];
  initialServices: ServiceItem[];
  initialMessages: ContactMessage[];
  initialJobs: VideoGenerationJob[];
}

export default function AdminDashboardClient({
  initialCompanies,
  initialSettings,
  initialProjects,
  initialServices,
  initialMessages,
  initialJobs
}: AdminDashboardProps) {
  const [tab, setTab] = useState<
    'companies' | 'settings' | 'projects' | 'services' | 'messages' | 'jobs'
  >('companies');

  // State
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [projects] = useState<Project[]>(initialProjects);
  const [services] = useState<ServiceItem[]>(initialServices);
  const [messages] = useState<ContactMessage[]>(initialMessages);
  const [jobs, setJobs] = useState<VideoGenerationJob[]>(initialJobs);

  // Selected Edit Targets
  const [editingCompany, setEditingCompany] = useState<Company | null>(companies[0] || null);
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showNotice = (type: 'success' | 'error', text: string) => {
    setStatusNotice({ type, text });
    setTimeout(() => setStatusNotice(null), 4000);
  };

  // Logout
  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    window.location.reload();
  };

  // Save Company
  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;

    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCompany)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update company');

      setCompanies((prev) =>
        prev.map((c) => (c.id === data.company.id ? data.company : c))
      );
      setEditingCompany(data.company);
      showNotice('success', `Company "${data.company.name}" successfully updated.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      showNotice('error', msg);
    }
  };

  // Add New Company
  const handleAddNewCompany = () => {
    const newComp: Company = {
      id: 'comp_' + Math.random().toString(36).substring(2, 9),
      name: 'New Venture Company',
      slug: 'new-venture-' + Math.random().toString(36).substring(2, 5),
      category: 'Strategic Venture',
      description: 'Configurable company description.',
      logo_url: '',
      official_url: '',
      website_verified: false,
      display_order: companies.length + 1,
      is_active: true,
      brand_color: '#3B82F6',
      hero_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Emerging Portfolio Specialization'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCompanies([...companies, newComp]);
    setEditingCompany(newComp);
  };

  // Delete Company
  const handleDeleteCompany = async (id: string) => {
    if (!confirm('Are you sure you want to remove this company profile?')) return;
    try {
      const res = await fetch(`/api/companies/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      const updated = companies.filter((c) => c.id !== id);
      setCompanies(updated);
      setEditingCompany(updated[0] || null);
      showNotice('success', 'Company removed.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed';
      showNotice('error', msg);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Settings update failed');
      showNotice('success', 'Site settings published successfully.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      showNotice('error', msg);
    }
  };

  // Retry Video Job
  const handleRetryJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/video/jobs/${jobId}`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Retry failed');
      setJobs((prev) => prev.map((j) => (j.id === jobId ? data.job : j)));
      showNotice('success', 'Job re-queued for generation.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      showNotice('error', msg);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0E1117] border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Nexora Group Management Console
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Centralized portal for venture profiles, verified URLs, editorial content, and AI studio jobs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl text-xs text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors inline-flex items-center gap-1.5"
            target="_blank"
          >
            <span>Preview Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 transition-colors inline-flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      {statusNotice && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs ${
            statusNotice.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/15 border border-red-500/30 text-red-300'
          }`}
        >
          {statusNotice.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusNotice.text}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'companies', label: 'Company Profiles & URLs', icon: Building2 },
          { id: 'settings', label: 'Site Content & Vision', icon: FileText },
          { id: 'projects', label: 'Projects & Case Studies', icon: Briefcase },
          { id: 'services', label: 'Venture Services', icon: Layers },
          { id: 'jobs', label: 'AI Video Jobs', icon: Sparkles, badge: jobs.length },
          { id: 'messages', label: 'Incoming Inquiries', icon: Inbox, badge: messages.filter((m) => m.status === 'unread').length }
        ].map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id as 'companies' | 'settings' | 'projects' | 'services' | 'messages' | 'jobs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all inline-flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-lg shadow-white/5'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
              {t.badge !== undefined && t.badge > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-black text-white' : 'bg-white/10 text-zinc-300'}`}>
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: COMPANIES MANAGEMENT */}
      {/* ========================================================= */}
      {tab === 'companies' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Company List Sidebar */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#0E1117] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Member Companies ({companies.length})
              </h3>
              <button
                type="button"
                onClick={handleAddNewCompany}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Add New Venture"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {companies.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setEditingCompany(c)}
                  className={`w-full p-3.5 rounded-xl text-left transition-all border flex flex-col gap-1 ${
                    editingCompany?.id === c.id
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-black/30 border-white/5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{c.name}</span>
                    {c.website_verified && c.official_url ? (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] opacity-70 truncate">{c.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Company Edit Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/10">
            {editingCompany ? (
              <form onSubmit={handleSaveCompany} className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Edit Profile: {editingCompany.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Configure public display properties, official website links, and verification status.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCompany(editingCompany.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Company"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCompany.name}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCompany.slug}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, slug: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                    Industry / Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCompany.category}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
                  />
                </div>

                {/* Central Verified Website System (CRITICAL REQUIREMENT) */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/15 space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                      Official External Website Configuration
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Enter the verified URL when ready. Before a URL is verified, the public card displays <strong>&quot;Website coming soon&quot;</strong> to prevent broken navigation.
                  </p>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">
                      Official Website URL
                    </label>
                    <input
                      type="url"
                      value={editingCompany.official_url || ''}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, official_url: e.target.value })
                      }
                      placeholder="https://www.example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs focus:border-white/40"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="website_verified_chk"
                      checked={editingCompany.website_verified}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, website_verified: e.target.checked })
                      }
                      className="w-4 h-4 rounded bg-black border-white/20 text-white"
                    />
                    <label htmlFor="website_verified_chk" className="text-xs text-zinc-200 cursor-pointer">
                      Mark official website as verified & live (Enables clickable card navigation to actual website)
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingCompany.description}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      Hero Image URL
                    </label>
                    <input
                      type="url"
                      value={editingCompany.hero_image_url || ''}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, hero_image_url: e.target.value })
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      Display Order (1-4)
                    </label>
                    <input
                      type="number"
                      value={editingCompany.display_order}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, display_order: Number(e.target.value) })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <Link
                    href={`/companies/${editingCompany.slug}`}
                    target="_blank"
                    className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Preview Company Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Company Changes</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-12 text-center text-zinc-500 text-xs">
                Select a company from the list to begin editing.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SITE SETTINGS & VISION */}
      {/* ========================================================= */}
      {tab === 'settings' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/10 max-w-4xl">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-4">
              Homepage Headlines & Corporate Vision
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                Main Tagline / Headline
              </label>
              <input
                type="text"
                required
                value={settings.hero_headline}
                onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                Supporting Headline
              </label>
              <input
                type="text"
                required
                value={settings.hero_subheadline}
                onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                Supporting Description
              </label>
              <textarea
                rows={2}
                required
                value={settings.hero_description}
                onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs resize-none"
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase text-zinc-300 mb-4">
                About Nexora Group Section
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Ecosystem Story</label>
                  <textarea
                    rows={3}
                    value={settings.about_story}
                    onChange={(e) => setSettings({ ...settings, about_story: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Mission</label>
                    <textarea
                      rows={3}
                      value={settings.about_mission}
                      onChange={(e) => setSettings({ ...settings, about_mission: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Vision</label>
                    <textarea
                      rows={3}
                      value={settings.about_vision}
                      onChange={(e) => setSettings({ ...settings, about_vision: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: PROJECTS MANAGEMENT */}
      {/* ========================================================= */}
      {tab === 'projects' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Portfolio Projects & Case Studies ({projects.length})</h3>
              <p className="text-xs text-zinc-400">
                Demonstration prototypes and verified commercial projects assigned to member companies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{p.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                    {p.company_name}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-zinc-500">
                  <span>{p.category}</span>
                  {p.is_demo && <span className="font-mono text-zinc-400">Demonstration Model</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: VENTURE SERVICES */}
      {/* ========================================================= */}
      {tab === 'services' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Venture Services Catalog ({services.length})</h3>
              <p className="text-xs text-zinc-400">
                Enterprise service capabilities displayed on the corporate homepage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.id} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{s.category}</span>
                <h4 className="text-xs font-bold text-white">{s.title}</h4>
                <p className="text-xs text-zinc-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: AI VIDEO GENERATION JOBS */}
      {/* ========================================================= */}
      {tab === 'jobs' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">AI Video Generation Jobs Log</h3>
              <p className="text-xs text-zinc-400">
                Track async generation lifecycle, polling results, and provider responses.
              </p>
            </div>
            <Link
              href="/studio"
              className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10"
            >
              Open Studio
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-500 font-mono uppercase">
                  <th className="py-3 px-4">Job ID</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">Prompt</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-white/5">
                    <td className="py-3 px-4 font-mono text-zinc-300">{j.id}</td>
                    <td className="py-3 px-4 text-white font-medium">{j.company_name}</td>
                    <td className="py-3 px-4 font-mono uppercase text-zinc-400">{j.provider}</td>
                    <td className="py-3 px-4 text-zinc-300 max-w-xs truncate">{j.prompt}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded ${
                          j.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : j.status === 'failed'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {j.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {j.status === 'failed' ? (
                        <button
                          type="button"
                          onClick={() => handleRetryJob(j.id)}
                          className="text-zinc-300 hover:text-white inline-flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      ) : j.result_video_url ? (
                        <a
                          href={j.result_video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-300 hover:text-white inline-flex items-center gap-1"
                        >
                          <span>Play</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: INCOMING CONTACT INQUIRIES */}
      {/* ========================================================= */}
      {tab === 'messages' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-white/10 pb-4">
            Contact Form Submissions ({messages.length})
          </h3>

          {messages.length === 0 ? (
            <p className="text-xs text-zinc-500 py-8 text-center">No messages received yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-white">{m.name}</span>
                      <span className="text-xs text-zinc-400 ml-2">&lt;{m.email}&gt;</span>
                      {m.company && (
                        <span className="text-xs text-zinc-500 ml-2">&bull; {m.company}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {new Date(m.created_at).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-200">{m.subject}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
