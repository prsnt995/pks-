'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';

interface CompanyShowcaseItem {
  id: string;
  num: string;
  name: string;
  url: string;
  localVideo: string;
  fallbackVideo: string;
  localPoster: string;
  fallbackPoster: string;
}

const SHOWCASE_TRANSLATIONS: Record<string, { en: string; ko: string; zh: string }> = {
  rozena: {
    en: 'AI virtual clothing fitting platform (AIVALAPS®) & curated soft-grunge fashion.',
    ko: 'AI 가상 피팅 플랫폼 (AIVALAPS®) & 감각적인 소프트 그런지 패션.',
    zh: 'AI 虚拟试衣平台 (AIVALAPS®) 与精选柔和颓废风时尚。'
  },
  damgara: {
    en: 'STORYSYNC — Real-time AI facade media art transforming memories into mythic visuals.',
    ko: 'STORYSYNC — 추억을 신화적 비주얼로 승화시키는 실시간 AI 파사드 미디어 아트.',
    zh: 'STORYSYNC — 将记忆实时转化为神话级视觉的 AI 媒体立面艺术。'
  },
  nextep: {
    en: '3D engine & AI-powered CG video production, VR/AR/MR & immersive media.',
    ko: '3D 엔진 및 AI 기반 CG 영상 제작, VR/AR/MR 및 몰입형 실감 미디어.',
    zh: '基于 3D 引擎与 AI 的 CG 视频制作、VR/AR/MR 及沉浸式媒体。'
  },
  noeul: {
    en: 'Premium Seoul contemporary fashion label with minimalist, sensuous silhouettes.',
    ko: '미니멀하고 감각적인 실루엣의 서울 프리미엄 컨템포러리 패션 레이블.',
    zh: '融合极简与感性剪裁的首尔高端当代时尚品牌。'
  }
};

const SHOWCASE_COMPANIES: CompanyShowcaseItem[] = [
  {
    id: 'rozena',
    num: '01 / 04',
    name: 'ROZENA',
    url: 'https://rozena.co.kr/',
    localVideo: '/videos/rozena.mp4',
    fallbackVideo: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-futuristic-silver-outfit-39871-large.mp4',
    localPoster: '/rozena-poster.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'damgara',
    num: '02 / 04',
    name: 'DAMGARA',
    url: 'https://damgara.co.kr/',
    localVideo: '/videos/damgara.mp4',
    fallbackVideo: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42861-large.mp4',
    localPoster: '/damgara-poster.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'nextep',
    num: '03 / 04',
    name: 'NEXTEP',
    url: 'https://nextep.co.kr/',
    localVideo: '/videos/nextep.mp4',
    fallbackVideo: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31911-large.mp4',
    localPoster: '/nextep-poster.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'noeul',
    num: '04 / 04',
    name: 'NOEUL',
    url: 'https://www.noeul.me/',
    localVideo: '/videos/noeul.mp4',
    fallbackVideo: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-black-jacket-walking-in-slow-motion-41052-large.mp4',
    localPoster: '/noeul-poster.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80'
  }
];

export default function CompanyVideoShowcase() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [playingState, setPlayingState] = useState<Record<string, boolean>>({
    rozena: false,
    damgara: false,
    nextep: false,
    noeul: false
  });
  const stoppedByUser = useRef<Set<string>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>('section[data-showcase="true"]');
    const videos = container.querySelectorAll<HTMLVideoElement>('video');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const pauseVideo = (video: HTMLVideoElement, id: string) => {
      video.pause();
      setPlayingState((prev) => ({ ...prev, [id]: false }));
    };

    const playVideo = (video: HTMLVideoElement, id: string) => {
      if (reduceMotion.matches || stoppedByUser.current.has(id) || document.hidden) return;
      video.play()
        .then(() => {
          setPlayingState((prev) => ({ ...prev, [id]: true }));
        })
        .catch(() => {
          pauseVideo(video, id);
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          const id = section.id;
          const video = section.querySelector('video');
          if (!video) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            // Pause all other videos
            videos.forEach((other) => {
              if (other !== video) {
                const otherId = other.closest('section')?.id;
                if (otherId) pauseVideo(other, otherId);
              }
            });
            playVideo(video, id);
          } else {
            pauseVideo(video, id);
          }
        });
      },
      { threshold: [0, 0.55] }
    );

    sections.forEach((s) => observer.observe(s));

    const handleVisibility = () => {
      if (document.hidden) {
        videos.forEach((v) => {
          const id = v.closest('section')?.id;
          if (id) pauseVideo(v, id);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const toggleVideo = (id: string) => {
    const section = document.getElementById(id);
    const video = section?.querySelector('video');
    if (!video) return;

    if (video.paused) {
      stoppedByUser.current.delete(id);
      video.play()
        .then(() => setPlayingState((prev) => ({ ...prev, [id]: true })))
        .catch(() => {});
    } else {
      stoppedByUser.current.add(id);
      video.pause();
      setPlayingState((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div id="showcase" ref={containerRef} className="w-full bg-[#08090a] scroll-smooth">
      {SHOWCASE_COMPANIES.map((company) => {
        const isPlaying = playingState[company.id];

        return (
          <section
            key={company.id}
            id={company.id}
            data-showcase="true"
            aria-label={company.name}
            className="relative h-[100svh] min-h-[480px] w-full overflow-hidden bg-[#08090a] snap-start border-b border-white/5"
          >
            {/* Background Cinematic Video with Fallback Poster & Stream */}
            <video
              muted
              loop
              playsInline
              preload="none"
              poster={company.fallbackPoster}
              className="absolute inset-0 h-full w-full object-cover"
            >
              {/* Local video if available */}
              <source src={company.localVideo} type="video/mp4" />
              {/* Online motion video preview fallback */}
              <source src={company.fallbackVideo} type="video/mp4" />
            </video>

            {/* Subtle Gradient Overlays for Readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090a]/90 via-black/25 to-[#08090a]/70" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090a]/70 via-transparent to-transparent" />

            {/* Venture Title & Index Overlay */}
            <div className="absolute top-[34%] sm:top-[38%] left-[6%] sm:left-[7%] z-10 max-w-xl pr-4">
              <small className="text-[#d3ad6d] font-mono tracking-[0.25em] text-xs uppercase block mb-2 sm:mb-3">
                {company.num}
              </small>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#eee7db] tracking-wide mb-3 sm:mb-4">
                {company.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-md">
                {SHOWCASE_TRANSLATIONS[company.id]?.[language] || ''}
              </p>
            </div>

            {/* Explore Official Website Button (Left) */}
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-[9%] left-[6%] z-20 border border-[#a38854] px-5 py-3.5 text-xs sm:text-sm font-medium tracking-wider text-[#eee7db] bg-[#08090a]/80 backdrop-blur-md hover:bg-[#a38854]/25 hover:text-white transition-all shadow-2xl focus-visible:outline-2 focus-visible:outline-[#e1b767] focus-visible:outline-offset-4"
            >
              {language === 'ko'
                ? `${company.name} 바로가기 ↗`
                : language === 'zh'
                ? `探索 ${company.name} ↗`
                : `Explore ${company.name} ↗`}
            </a>

            {/* Video Play / Pause Toggle Button (Right) */}
            <button
              type="button"
              onClick={() => toggleVideo(company.id)}
              aria-label={`Play or pause ${company.name} video`}
              className="absolute right-[5%] bottom-[9%] z-20 flex h-[54px] w-[54px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-[#847452] bg-[#08090a]/80 text-[#ddd] backdrop-blur-md transition-all hover:bg-[#847452]/25 hover:text-white shadow-2xl focus-visible:outline-2 focus-visible:outline-[#e1b767] focus-visible:outline-offset-4 cursor-pointer"
            >
              {isPlaying ? (
                <div className="flex items-center gap-1">
                  <Pause className="w-4 h-4 text-[#eee7db]" />
                  <span className="sr-only">Pause</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4 text-[#eee7db] ml-0.5" />
                  <span className="sr-only">Play</span>
                </div>
              )}
            </button>
          </section>
        );
      })}

      {/* Cinematic Showcase Footer Note from Prototype */}
      <footer className="border-t border-white/10 bg-[#08090a] py-12 px-4 text-center text-xs text-[#ad9d82]">
        <p className="font-serif tracking-widest text-[#eee7db] text-sm mb-2">
          {language === 'ko'
            ? 'PSK · 4개의 기업. 하나의 비전.'
            : language === 'zh'
            ? 'PSK · 四大企业. 同一个愿景.'
            : 'PSK · Four companies. One vision.'}
        </p>
        <p className="max-w-xl mx-auto text-[11px] text-zinc-500 leading-relaxed">
          {language === 'ko'
            ? '오리지널 모션 그래픽 콘셉트입니다. 기업명은 텍스트로 표기되었으며 공식 로고나 기업 푸티지는 사용되지 않았습니다.'
            : language === 'zh'
            ? '原创动态视觉概念展示。公司名称以纯文本呈现，未使用官方标志或企业素材。'
            : 'Original motion graphic concepts. Company names rendered as text; no official logos or company footage used.'}
        </p>
      </footer>
    </div>
  );
}
