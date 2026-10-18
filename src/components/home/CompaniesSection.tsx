'use client';

import { Company } from '@/types';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Clock, Layers } from 'lucide-react';

interface CompaniesSectionProps {
  companies: Company[];
}

export default function CompaniesSection({ companies }: CompaniesSectionProps) {
  return (
    <section id="companies" className="py-24 bg-[#08090A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>Portfolio Ventures</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Our Companies
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Four specialized ventures — AI technology, immersive media art, next-generation CG production, and contemporary fashion — united under the Nexora umbrella.
          </p>
        </div>

        {/* 4 Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {companies.map((company) => {
            const hasVerifiedUrl = Boolean(
              company.website_verified &&
              company.official_url &&
              company.official_url.trim().length > 0 &&
              (company.official_url.startsWith('http://') || company.official_url.startsWith('https://'))
            );

            return (
              <div
                key={company.id}
                id={company.slug}
                className="group relative rounded-2xl overflow-hidden bg-[#0E1117] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between scroll-mt-28"
              >
                {/* Visual Header / Banner */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black/40">
                  {/* Company Media */}
                  {company.hero_image_url ? (
                    <img
                      src={company.hero_image_url}
                      alt={`${company.name} visual preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-85"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
                      <Layers className="w-12 h-12 text-zinc-700" />
                    </div>
                  )}

                  {/* Top Overlay Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-black/60 pointer-events-none" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10">
                      {company.category}
                    </span>

                    {/* Verification Status Badge */}
                    {hasVerifiedUrl ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Verified Live</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-400 border border-white/10 backdrop-blur-md">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>Website Coming Soon</span>
                      </span>
                    )}
                  </div>

                  {/* Monogram / Logo Mark */}
                  <div className="absolute bottom-4 left-6 z-10 flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center shadow-xl text-white font-bold text-lg"
                      style={{ backgroundColor: company.brand_color ? `${company.brand_color}22` : '#0E1117', borderColor: company.brand_color ? `${company.brand_color}55` : undefined }}
                    >
                      {company.logo_url ? (
                        <img src={company.logo_url} alt={`${company.name} logo`} className="w-8 h-8 object-contain" />
                      ) : (
                        <span style={{ color: company.brand_color || '#ffffff' }}>{company.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {company.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-light">
                        {company.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {company.description}
                    </p>

                    {/* Key Highlights */}
                    {company.highlights && company.highlights.length > 0 && (
                      <div className="space-y-1.5 mb-8">
                        {company.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: company.brand_color || '#71717a' }}
                            />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    {/* Detail Profile Link — Explore Company */}
                    <Link
                      href={`/companies/${company.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-colors shadow-sm"
                    >
                      <span>Explore Company</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Official Website Link */}
                    {hasVerifiedUrl ? (
                      <a
                        href={company.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group/btn"
                        aria-label={`Visit official website for ${company.name} (opens in new tab)`}
                      >
                        <span>Official Website</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 bg-zinc-900/60 border border-white/5 cursor-not-allowed"
                      >
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Website Coming Soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
