export const revalidate = 60;
export const dynamicParams = true;

import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getCompanies, getCompanyBySlug, getProjects } from '@/lib/db';
import { 
  ArrowLeft, 
  ArrowRight,
  ExternalLink, 
  Layers, 
  Globe, 
  CheckCircle2, 
  ArrowUpRight, 
  ShoppingBag, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return [
    { slug: 'rozena' },
    { slug: 'damgara' },
    { slug: 'nextep' },
    { slug: 'noeul' },
    { slug: 'nextepstudio' },
  ];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) {
    return { title: 'Company Not Found — NEXORA GROUP' };
  }
  return {
    title: `${company.name} — ${company.category} | NEXORA GROUP`,
    description: company.description,
    openGraph: {
      title: `${company.name} | NEXORA GROUP Corporate Portfolio`,
      description: company.description,
      url: `https://nexoragroup.com/companies/${company.slug}`,
      siteName: 'NEXORA GROUP',
      locale: 'ko_KR',
      type: 'website',
      images: company.hero_image_url ? [{ url: company.hero_image_url }] : [],
    },
  };
}

export default async function CompanyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Handle nextepstudio alias redirect to nextep
  if (slug === 'nextepstudio') {
    redirect('/companies/nextep');
  }

  const [company, allCompanies, allProjects] = await Promise.all([
    getCompanyBySlug(slug),
    getCompanies(),
    getProjects()
  ]);

  if (!company) {
    notFound();
  }

  const activeCompanies = allCompanies.filter((c) => c.is_active);
  const companyProjects = allProjects.filter(
    (p) => p.company_id === company.id || p.company_name?.toLowerCase() === company.name.toLowerCase()
  );

  const hasVerifiedUrl = Boolean(
    company.website_verified &&
    company.official_url &&
    company.official_url.trim().length > 0 &&
    (company.official_url.startsWith('http://') || company.official_url.startsWith('https://'))
  );

  // Determine previous and next companies for bottom pagination
  const currentIndex = activeCompanies.findIndex((c) => c.slug === company.slug || c.id === company.id);
  const prevCompany = activeCompanies[(currentIndex - 1 + activeCompanies.length) % activeCompanies.length];
  const nextCompany = activeCompanies[(currentIndex + 1) % activeCompanies.length];

  // Brand-tailored styling attributes
  const isRozena = company.slug === 'rozena';
  const isDamgara = company.slug === 'damgara';
  const isNextep = company.slug === 'nextep' || company.slug === 'nextepstudio';
  const isNoeul = company.slug === 'noeul';

  const brandAccent = company.brand_color || '#FFFFFF';

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Top Breadcrumb & Venture Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to NEXORA GROUP Portfolio</span>
            </Link>

            {/* Quick Venture Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mr-1 hidden sm:inline">
                Ventures:
              </span>
              {activeCompanies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/companies/${c.slug}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    c.slug === company.slug
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── HERO BANNER HEADER ── */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0A0C10] py-16 sm:py-24">
          {/* Subtle Ambient Background Media */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {company.hero_image_url && (
              <Image
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                src={company.hero_image_url}
                alt={`${company.name} hero background`}
                className="w-full h-full object-cover filter blur-sm scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090A] via-[#0A0C10]/95 to-[#08090A]" />
          </div>

          {/* Brand Color Top Gradient Strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 opacity-90"
            style={{
              background: `linear-gradient(90deg, transparent, ${brandAccent}, transparent)`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="space-y-6 max-w-3xl">
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: `${brandAccent}15`,
                      color: brandAccent,
                      borderColor: `${brandAccent}40`,
                    }}
                  >
                    {company.category}
                  </span>

                  {hasVerifiedUrl && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Verified Official Portal</span>
                    </span>
                  )}

                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    NEXORA GROUP · Portfolio Venture
                  </span>
                </div>

                {/* Main Company Title */}
                <div>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                    {company.name}
                  </h1>
                  {company.tagline && (
                    <p className="mt-2 text-lg sm:text-xl text-zinc-300 font-light tracking-wide">
                      {company.tagline}
                    </p>
                  )}
                  {company.korean_tagline && (
                    <p className="mt-1 text-sm text-zinc-400 font-normal">
                      {company.korean_tagline}
                    </p>
                  )}
                </div>

                {/* Company Executive Introduction */}
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
                  {company.description}
                </p>

                {/* Vision Statement Callout */}
                {company.vision && (
                  <div
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden"
                    style={{ borderLeftColor: brandAccent, borderLeftWidth: '4px' }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                      Company Vision
                    </span>
                    <blockquote className="text-sm sm:text-base italic text-zinc-200 font-medium">
                      &ldquo;{company.vision}&rdquo;
                    </blockquote>
                  </div>
                )}
              </div>

              {/* Action Buttons Box */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
                {hasVerifiedUrl && (
                  <a
                    href={company.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl shadow-white/5 group"
                    aria-label={`Open official website for ${company.name} (opens in new tab)`}
                  >
                    <Globe className="w-4 h-4 text-black" />
                    <span>{company.cta_text || 'Visit Official Website'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}

                <a
                  href="#services"
                  className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore Capabilities</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPANY-SPECIFIC FLAGSHIP SPOTLIGHT SECTIONS ── */}

        {/* 1. ROZENA SPOTLIGHT: AIVALAPS & Soft Grunge */}
        {isRozena && (
          <section className="py-16 border-b border-white/10 bg-[#0B0D12]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Feature 1: AIVALAPS */}
                <div className="p-8 rounded-3xl bg-[#0E1117] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-3xl pointer-events-none rounded-full" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 text-zinc-300">
                      Flagship AI Platform
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                      AIVALAPS® — Virtual Fitting & Commercial Content
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      Upload garment images and seamlessly fit them onto realistic AI virtual models. Without complex prompt engineering, create studio-quality image and video campaigns optimized for digital storefronts and social platforms.
                    </p>
                    <div className="space-y-2 text-xs text-zinc-300 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Promptless click-to-fit AI garment simulation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Cross-platform availability: iOS, Android, and Web</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>High-resolution commercial marketing asset generation</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://rozena.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:underline pt-4 border-t border-white/10"
                  >
                    <span>Experience AIVALAPS on rozena.co.kr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Feature 2: Soft Grunge Fashion */}
                <div className="p-8 rounded-3xl bg-[#0E1117] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 text-zinc-300">
                      Fashion Curation & Brand
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                      Soft Grunge Curation & In-House Production
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      A dedicated fashion brand and e-commerce experience tailored for Gen Z and young women. ROZENA manages the complete value chain from aesthetic mood curation, apparel manufacturing, and design to proprietary AI fitting solutions.
                    </p>
                    <div className="space-y-2 text-xs text-zinc-300 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                        <span>Curated soft grunge aesthetic & streetwear capsules</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                        <span>Integrated manufacturing, branding, and distribution</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                        <span>Adaptive e-commerce UX designed for high customer engagement</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://rozena.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:underline pt-4 border-t border-white/10"
                  >
                    <span>Visit ROZENA Fashion Store</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. DAMGARA SPOTLIGHT: STORYSYNC Pro & Media Art */}
        {isDamgara && (
          <section className="py-16 border-b border-white/10 bg-[#090D14]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0C121D] border border-sky-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />
                <div className="max-w-3xl">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    STORYSYNC Pro System
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
                    Your Memories, Projected into Living Stories
                  </h3>
                  <p className="text-base text-zinc-300 leading-relaxed mb-6">
                    Static displays no longer captivate modern audiences. STORYSYNC Pro is a real-time AI architectural facade system that takes GPS-tagged social media photos and weaves them into living, mythic narratives projected across monumental urban canvases.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs font-bold text-sky-400 block mb-1">No Apps Required</span>
                      <p className="text-xs text-zinc-400">Audiences interact frictionlessly without downloading specialized applications.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs font-bold text-sky-400 block mb-1">Real-Time AI Facade</span>
                      <p className="text-xs text-zinc-400">Instantly converts submitted memories into generative animated media art.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs font-bold text-sky-400 block mb-1">Mythic Heritage Stories</span>
                      <p className="text-xs text-zinc-400">Embedded narrative engines such as the Jeju Island Myth installation.</p>
                    </div>
                  </div>
                  <a
                    href="https://damgara.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-sky-400 transition-colors"
                  >
                    <span>Explore STORYSYNC Pro on damgara.co.kr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. NEXTEP SPOTLIGHT: 3D Engine & Lumiverse Theme Park */}
        {isNextep && (
          <section className="py-16 border-b border-white/10 bg-[#120B0C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <div className="p-8 rounded-3xl bg-[#160E10] border border-red-500/20 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      Established 2008 · Gangnam, Seoul
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                      3D Engine, CGI & Virtual Production
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      NEXTEP Studio ((주)넥스텝스튜디오) combines real-time 3D engine technology with AI-assisted computer-generated imagery. Specialized in BIM visualization, architectural simulation, and hardware-synchronized VR/AR/MR content.
                    </p>
                    <div className="space-y-2 text-xs text-zinc-300 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>Over 16 years of engineering visualization excellence</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>Interactive hardware & real-time rendering systems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>BIM-based civil, commercial, and architectural media</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://nextep.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 pt-4 border-t border-white/10"
                  >
                    <span>View Technical Portfolio on nextep.co.kr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-8 rounded-3xl bg-[#160E10] border border-red-500/20 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      Theme Park Operations
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                      빛의섬 루미버스 (Lumiverse) Night Multimedia
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      Operating the nocturnal multimedia attraction &ldquo;빛의섬 루미버스&rdquo; at Jeju Folk Village. Merging spatial lighting design, interactive projection, and proprietary IP to deliver an enchanting, high-revenue tourist destination.
                    </p>
                    <div className="space-y-2 text-xs text-zinc-300 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>Jeju Folk Village permanent immersive installation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>Turnkey theme park attraction operation and IP development</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>Synchronized audio-visual environmental lighting networks</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://nextep.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 pt-4 border-t border-white/10"
                  >
                    <span>Learn more on nextep.co.kr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. NOEUL SPOTLIGHT: Editorial Runway & Complete Your Style */}
        {isNoeul && (
          <section className="py-16 border-b border-white/10 bg-[#0E0C0A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#14100B] border border-amber-500/20 relative overflow-hidden">
                <div className="max-w-3xl">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    2026 S/S Signature Collection
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
                    노을의 실루엣 — Silhouette of Twilight
                  </h3>
                  <p className="text-base text-zinc-300 leading-relaxed mb-6 font-light">
                    Inspired by the serene, understated elegance of dusk falling over Seoul. NOEUL creates wardrobe essentials defined by restrained proportions, sensuous silhouettes, and exceptional fabric weight.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <span className="text-xs font-bold text-amber-200 block">Men&apos;s Line</span>
                      <span className="text-[11px] text-zinc-400">Tailored Jackets & Pants</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <span className="text-xs font-bold text-amber-200 block">Women&apos;s Line</span>
                      <span className="text-[11px] text-zinc-400">Fluid Silhouettes</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <span className="text-xs font-bold text-amber-200 block">Shirts & Tees</span>
                      <span className="text-[11px] text-zinc-400">High-Density Cotton</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <span className="text-xs font-bold text-amber-200 block">Accessories</span>
                      <span className="text-[11px] text-zinc-400">Curated Bags & Leather</span>
                    </div>
                  </div>
                  <a
                    href="https://www.noeul.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10"
                  >
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>Shop NOEUL at noeul.me</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CORE SERVICES & CAPABILITIES SECTION ── */}
        <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandAccent }} />
                <span>Expertise & Solutions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Services & Capabilities
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Specialized domains and commercial offerings delivered by {company.name} under the NEXORA GROUP umbrella.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.services_list && company.services_list.length > 0 ? (
              company.services_list.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0E1117] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {srv.badge && (
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border inline-block mb-3"
                        style={{
                          backgroundColor: `${brandAccent}15`,
                          color: brandAccent,
                          borderColor: `${brandAccent}30`,
                        }}
                      >
                        {srv.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandAccent }} />
                  </div>
                </div>
              ))
            ) : (
              company.highlights?.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0E1117] border border-white/10 flex items-start gap-3"
                >
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: brandAccent }}
                  />
                  <span className="text-sm text-zinc-200 font-medium">{highlight}</span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── PROJECTS & PORTFOLIO CASE STUDIES SECTION ── */}
        <section className="py-20 border-t border-white/10 bg-[#08090A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandAccent }} />
                  <span>Work & Case Studies</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Portfolio & Featured Work
                </h2>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                {companyProjects.length} Verified Case Stud{companyProjects.length !== 1 ? 'ies' : 'y'}
              </span>
            </div>

            {companyProjects.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#0E1117] border border-white/10">
                <Layers className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                <p className="text-sm text-zinc-400">
                  Detailed portfolio entries for {company.name} are curated directly on the official portal.
                </p>
                {hasVerifiedUrl && (
                  <a
                    href={company.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
                  >
                    <span>View Projects on Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {companyProjects.map((p) => (
                  <div
                    key={p.id}
                    className="group rounded-2xl overflow-hidden bg-[#0E1117] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="h-64 relative bg-zinc-950 overflow-hidden">
                      <Image
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                        src={p.image_url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                          {p.description}
                        </p>
                        {p.tags && p.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {p.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {hasVerifiedUrl && (
                        <div className="pt-4 border-t border-white/10">
                          <a
                            href={company.official_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors group/p"
                          >
                            <span>Explore on Official Portal</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-p:translate-x-0.5 group-p:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CORPORATE PROFILE & INQUIRIES CARD ── */}
        <section className="py-20 border-t border-white/10 bg-[#0B0D12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0E1117] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Official Venture Portal
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Experience {company.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Discover more about {company.name}&apos;s products, services, and creative platforms on their official web destination.
                </p>

                {company.founded_year && (
                  <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Est. {company.founded_year}</span>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0">
                {hasVerifiedUrl && (
                  <a
                    href={company.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors inline-flex items-center gap-2.5 shadow-xl"
                  >
                    <span>{company.cta_text || 'Visit Official Website'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── VENTURE PAGINATION: NEXT / PREVIOUS COMPANY ── */}
        <section className="py-12 border-t border-white/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevCompany && (
              <Link
                href={`/companies/${prevCompany.slug}`}
                className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all flex items-center gap-4 group"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                    Previous Venture
                  </span>
                  <span className="text-sm font-bold text-white">{prevCompany.name}</span>
                  <span className="text-xs text-zinc-400 block">{prevCompany.category}</span>
                </div>
              </Link>
            )}

            {nextCompany && (
              <Link
                href={`/companies/${nextCompany.slug}`}
                className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all flex items-center justify-between text-right group"
              >
                <div className="text-left sm:text-right flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                    Next Venture
                  </span>
                  <span className="text-sm font-bold text-white">{nextCompany.name}</span>
                  <span className="text-xs text-zinc-400 block">{nextCompany.category}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all ml-4" />
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer companies={activeCompanies} />
    </div>
  );
}
