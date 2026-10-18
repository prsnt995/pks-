'use client';

import { SiteSettings } from '@/types';
import { Target, Compass, ShieldCheck } from 'lucide-react';

interface AboutSectionProps {
  settings: SiteSettings;
}

export default function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-[#08090A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Vision Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>Corporate Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              AI, Culture &amp; Creativity — United.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {settings.about_story}
            </p>

            <div className="pt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Transparent Corporate Structure</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Nexora Group is the umbrella platform for Rozena, Damgara, Nextep Studio, and Noeul — sharing AI infrastructure, brand strategy, and creative execution across all four ventures.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission & Vision Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="p-8 rounded-2xl bg-[#0E1117] border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Target className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-wide">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {settings.about_mission}
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-8 rounded-2xl bg-[#0E1117] border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Compass className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-wide">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {settings.about_vision}
                </p>
              </div>
            </div>

            {/* Strategic Anchors Row */}
            <div className="p-8 rounded-2xl bg-[#0E1117] border border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">
                Group Operating Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-white">01. AI-First Products</span>
                  <p className="text-xs text-zinc-400">
                    From AIVALAPS virtual fitting to STORYSYNC real-time media facades — every product is AI-native.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-white">02. Creative Technology</span>
                  <p className="text-xs text-zinc-400">
                    Nextep Studio&apos;s CG pipelines and Rozena&apos;s platforms push the frontier of digital content creation.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-white">03. Culture &amp; Style</span>
                  <p className="text-xs text-zinc-400">
                    Noeul defines Seoul-contemporary fashion while Rozena curates next-gen soft grunge retail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
