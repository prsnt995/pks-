export const dynamic = 'force-dynamic';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StudioClient from './StudioClient';
import { getCompanies, getVideos } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Video Studio — NEXORA GROUP',
  description:
    'Dedicated AI generative media engine creating bespoke corporate and promotional video assets for Nexora Group portfolio enterprises.'
};

export default async function StudioPage() {
  const [companies, videos] = await Promise.all([getCompanies(), getVideos()]);

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Generative Video Production Suite</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              AI Video Studio
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Synthesize cinematic promotional showcases, website ambient loops, and vertical social campaign assets tailored for each company within the Nexora portfolio.
            </p>
          </div>

          <StudioClient companies={companies} initialVideos={videos} />
        </div>
      </main>

      <Footer companies={companies} />
    </div>
  );
}
