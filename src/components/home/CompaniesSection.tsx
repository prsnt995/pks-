'use client';

import { Company } from '@/types';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Clock, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CompaniesSectionProps {
  companies: Company[];
}

const COMPANY_TEXTS: Record<string, {
  category: { en: string; ko: string; zh: string };
  desc: { en: string; ko: string; zh: string };
  highlights: { en: string[]; ko: string[]; zh: string[] };
}> = {
  rozena: {
    category: { en: 'AI Tech & Fashion', ko: 'AI 기술 & 패션', zh: 'AI 技术与时尚' },
    desc: {
      en: 'AI virtual clothing fitting platform (AIVALAPS) and curated soft-grunge fashion.',
      ko: '클릭 한 번으로 가상 피팅이 가능한 AIVALAPS 플랫폼과 소프트 그런지 감성의 스트리트웨어 패션을 전개합니다.',
      zh: '一键虚拟试衣平台 AIVALAPS 与精选柔和颓废风街头服饰系列。'
    },
    highlights: {
      en: [
        'Promptless click-to-fit AI garment simulation',
        'Cross-platform availability: iOS, Android, and Web',
        'High-resolution commercial marketing asset generation',
        'Curated soft grunge aesthetic & streetwear capsules'
      ],
      ko: [
        '프롬프트 없이 클릭만으로 AI 의류 가상 피팅',
        'iOS, Android 및 웹 크로스 플랫폼 지원',
        '고해상도 상업용 마케팅 이미지 생성',
        '소프트 그런지 감성의 스트리트웨어 컬렉션'
      ],
      zh: [
        '无需提示词，点击即可进行 AI 虚拟试衣',
        '支持 iOS、Android 和网页跨平台',
        '生成高分辨率商业营销素材',
        '精选柔和颓废风街头服饰系列'
      ]
    }
  },
  damgara: {
    category: { en: 'AI Media Art', ko: 'AI 미디어 아트', zh: 'AI 媒体艺术' },
    desc: {
      en: 'STORYSYNC — Real-time AI facade media art transforming memories into mythic visuals.',
      ko: '관람객의 추억과 감정을 실시간 AI 미디어 파사드로 변환하는 몰입형 미디어 아트 솔루션 STORYSYNC를 제작합니다.',
      zh: 'STORYSYNC — 将观众记忆与情感实时转化为神话级视觉的 AI 媒体立面艺术。'
    },
    highlights: {
      en: [
        'No Apps Required — friction-free audience interaction',
        'Real-Time AI Facade generating mythic visuals from memories',
        'Embedded narrative engines (Jeju Island Myth installation)'
      ],
      ko: [
        '앱 설치 없이 관람객이 자유롭게 참여',
        '추억을 실시간 신화적 비주얼로 변환하는 AI 파사드',
        '제주 신화 설치 작품 등 스토리텔링 내러티브 엔진'
      ],
      zh: [
        '观众无需安装应用即可轻松参与互动',
        '将回忆实时转化为神话级视觉的 AI 媒体立面',
        '融合济州岛神话装置等叙事引擎'
      ]
    }
  },
  nextep: {
    category: { en: 'Digital Content & CG', ko: '디지털 콘텐츠 & CG', zh: '数字内容与 CG' },
    desc: {
      en: '3D engine & AI-powered CG video production, VR/AR/MR & immersive media.',
      ko: '16년 이상의 기술 축적으로 3D 엔진 및 AI 기반 실시간 CG 영상 제작, VR/AR/MR 및 대형 몰입형 미디어를 선도합니다.',
      zh: '拥有16年以上技术积淀，专注 3D 引擎与 AI 驱动的 CG 视频制作、VR/AR/MR 及大型沉浸式媒体。'
    },
    highlights: {
      en: [
        'Over 16 years of engineering visualization excellence',
        'Interactive hardware & real-time rendering systems',
        'BIM-based civil, commercial, and architectural media',
        'Jeju Folk Village permanent immersive installation'
      ],
      ko: [
        '16년 이상의 엔지니어링 시각화 전문성',
        '인터랙티브 하드웨어 및 실시간 렌더링 시스템',
        'BIM 기반 토목·상업·건축 미디어',
        '제주민속촌 상설 몰입형 실감 전시'
      ],
      zh: [
        '超过16年的工程可视化专业经验',
        '交互式硬件与实时渲染系统',
        '基于 BIM 的土木、商业及建筑媒体',
        '济州民俗村常设沉浸式实感展览'
      ]
    }
  },
  noeul: {
    category: { en: 'Contemporary Fashion', ko: '컨템포러리 패션', zh: '当代时尚' },
    desc: {
      en: 'Premium Seoul contemporary fashion label with minimalist, sensuous silhouettes.',
      ko: '절제된 미니멀리즘과 감각적인 실루엣, 고품질 소재를 바탕으로 서울의 현대적 감성을 담아낸 프리미엄 패션 브랜드입니다.',
      zh: '以极简主义、感性剪裁与优质面料为基底，诠释首尔现代都市格调的高端当代时尚品牌。'
    },
    highlights: {
      en: [
        "Men's & Women's Tailored Lines",
        'Sensuous and fluid contemporary silhouettes',
        'High-density premium fabrics & tailored finishing',
        'Curated accessories and leather capsule goods'
      ],
      ko: [
        '남성복 및 여성복 테일러드 라인',
        '유연하고 감각적인 컨템포러리 실루엣',
        '고밀도 프리미엄 원단 및 정밀 테일러링 마감',
        '엄선된 가방 및 가죽 캡슐 컬렉션'
      ],
      zh: [
        '男女剪裁正装与日常系列',
        '流畅优雅的当代廓形设计',
        '高密度精选面料与精细剪裁工艺',
        '精选包袋与皮具配饰系列'
      ]
    }
  }
};

export default function CompaniesSection({ companies }: CompaniesSectionProps) {
  const { language } = useLanguage();

  const labels = {
    en: {
      badge: 'Portfolio Ventures',
      title: 'Our Companies',
      desc: 'Four specialized ventures — AI technology, immersive media art, next-generation CG production, and contemporary fashion — united under the Nexora umbrella.',
      verified: 'Verified Live',
      comingSoon: 'Website Coming Soon',
      explore: 'Explore Company',
      website: 'Official Website'
    },
    ko: {
      badge: '포트폴리오 기업',
      title: '계열사 소개',
      desc: 'AI 기술, 몰입형 미디어 아트, 차세대 CG 제작, 컨템포러리 패션 등 4개의 전문 기업이 Nexora 아래 하나로 연결됩니다.',
      verified: '공식 사이트 확인됨',
      comingSoon: '웹사이트 준비 중',
      explore: '기업 자세히 보기',
      website: '공식 웹사이트'
    },
    zh: {
      badge: '投资组合企业',
      title: '旗下公司',
      desc: '汇聚 AI 技术、沉浸式媒体艺术、新一代 CG 制作与当代时尚四大专业企业，共同构建 Nexora 创新矩阵。',
      verified: '已验证上线',
      comingSoon: '网站即将上线',
      explore: '了解公司',
      website: '官方网站'
    }
  }[language];

  return (
    <section id="companies" className="py-24 bg-[#08090A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>{labels.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {labels.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            {labels.desc}
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

            const coText = COMPANY_TEXTS[company.slug];
            const displayCategory = coText?.category[language] || company.category;
            const displayDesc = coText?.desc[language] || company.description;
            const displayHighlights = coText?.highlights[language] || company.highlights || [];

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
                      {displayCategory}
                    </span>

                    {/* Verification Status Badge */}
                    {hasVerifiedUrl ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{labels.verified}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-400 border border-white/10 backdrop-blur-md">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>{labels.comingSoon}</span>
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
                        {displayCategory}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {displayDesc}
                    </p>

                    {/* Key Highlights */}
                    {displayHighlights.length > 0 && (
                      <div className="space-y-1.5 mb-8">
                        {displayHighlights.map((highlight, idx) => (
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
                      <span>{labels.explore}</span>
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
                        <span>{labels.website}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 bg-zinc-900/60 border border-white/5 cursor-not-allowed"
                      >
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{labels.comingSoon}</span>
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
