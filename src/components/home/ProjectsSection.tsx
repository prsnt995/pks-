'use client';

import { useState } from 'react';
import { Company, Project } from '@/types';
import { Tag, Info } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  companies: Company[];
}

export default function ProjectsSection({ projects, companies }: ProjectsSectionProps) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('all');

  const filteredProjects =
    selectedCompanyId === 'all'
      ? projects
      : projects.filter((p) => p.company_id === selectedCompanyId);

  return (
    <section className="py-24 bg-[#08090A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>Case Studies & Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Featured Work
            </h2>
          </div>

          {/* Disclaimer badge about demonstration content */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 text-xs">
            <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>Demonstration prototypes & concept showcases</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Filter Projects by Company">
          <button
            type="button"
            onClick={() => setSelectedCompanyId('all')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
              selectedCompanyId === 'all'
                ? 'bg-white text-black shadow-md shadow-white/10'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            All Ventures
          </button>
          {companies.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCompanyId(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                selectedCompanyId === c.id
                  ? 'bg-white text-black shadow-md shadow-white/10'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden bg-[#0E1117] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview with Aspect Ratio & Badges */}
              <div className="relative h-64 overflow-hidden bg-zinc-950">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-black/60" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10">
                    {project.company_name}
                  </span>

                  {project.is_demo && (
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/10">
                      Demonstration
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description & Tags */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      <Tag className="w-3 h-3 text-zinc-500" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
