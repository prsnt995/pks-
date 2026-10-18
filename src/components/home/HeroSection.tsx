'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, Target } from 'lucide-react';

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  description?: string;
}

const VENTURES = [
  {
    num: '01',
    name: 'Rozena',
    tag: 'AI & Fashion',
    slug: 'rozena',
    color: '#9E9E9E'
  },
  {
    num: '02',
    name: 'Damgara',
    tag: 'Media Art',
    slug: 'damgara',
    color: '#46B1E1'
  },
  {
    num: '03',
    name: 'Nextep',
    tag: 'CG & Immersive',
    slug: 'nextep',
    color: '#FF3333'
  },
  {
    num: '04',
    name: 'Noeul',
    tag: 'Contemporary Fashion',
    slug: 'noeul',
    color: '#D4AF37'
  }
];

export default function HeroSection({
  headline = 'AI. Fashion. Content. Style.',
  subheadline = 'Four Ventures. One Vision.',
  description = 'A portfolio of specialized companies spanning AI platforms, immersive media art, next-generation CG production, and contemporary Korean fashion — each a leader in its domain.'
}: HeroSectionProps) {
  const [language, setLanguage] = useState<'en' | 'ko' | 'zh'>('en');

  useEffect(() => {
    const sync = () => {
      const next = window.localStorage.getItem('psk-language');
      if (next === 'en' || next === 'ko' || next === 'zh') setLanguage(next);
    };
    sync();
    window.addEventListener('psk-language-change', sync);
    return () => window.removeEventListener('psk-language-change', sync);
  }, []);

  const copy = {
    en: {
      badge: 'Multi-Venture Corporate Portfolio',
      title: headline || 'AI. Fashion. Content. Style.',
      subtitle: subheadline || 'Four Ventures. One Vision.',
      detail:
        description ||
        'A portfolio of specialized companies spanning AI platforms, immersive media art, next-generation CG production, and contemporary Korean fashion — each a leader in its domain.',
      explore: 'EXPLORE OUR COMPANIES'
    },
    ko: {
      badge: '다각화 기업 포트폴리오',
      title: 'AI. 패션. 콘텐츠. 스타일.',
      subtitle: '4개의 벤처. 하나의 비전.',
      detail:
        'AI 플랫폼, 몰입형 미디어 아트, 차세대 CG 제작, 현대 패션을 아우르는 전문 기업 포트폴리오 — 각 분야의 선두주자.',
      explore: '계열사 살펴보기'
    },
    zh: {
      badge: '多元创新企业矩阵',
      title: 'AI. 时尚. 内容. 风格.',
      subtitle: '四大企业. 同一个愿景.',
      detail:
        '涵盖 AI 平台、沉浸式媒体艺术、新一代 CG 制作与当代韩国时尚的专业企业矩阵 — 各领域的领军者。',
      explore: '探索旗下公司'
    }
  }[language];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* Background circuit board image & dark atmospheric vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="w-full h-full object-cover object-center opacity-25 contrast-125 grayscale"
        />
        {/* Radial vignette to darken edges while keeping center subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.65)_55%,#050505_95%)]" />
        {/* Vertical top and bottom gradients for seamless edge blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[11px] sm:text-xs text-zinc-300 mb-8 shadow-sm">
          <Target className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-semibold tracking-wider text-zinc-200">NEXORA GROUP</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400 font-light">{copy.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
          {copy.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-zinc-400 font-normal tracking-tight mb-6">
          {copy.subtitle}
        </p>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400/90 leading-relaxed mb-10">
          {copy.detail}
        </p>

        {/* CTA Button */}
        <a
          href="#rozena"
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-all text-xs font-semibold tracking-wider uppercase shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
        >
          <span>{copy.explore}</span>
          <ArrowDown className="w-3.5 h-3.5 text-black transition-transform group-hover:translate-y-0.5" />
        </a>

        {/* Bottom 4 Ventures Grid */}
        <div className="w-full max-w-4xl mt-16 sm:mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left">
          {VENTURES.map((v) => (
            <a
              key={v.slug}
              href={`#${v.slug}`}
              className="group block transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1">
                VENTURE {v.num}
              </p>
              <p className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                {v.name} — <span className="text-zinc-400 group-hover:text-zinc-300">{v.tag}</span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
