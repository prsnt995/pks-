'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ExternalLink, 
  Globe,
  Shield,
  ChevronDown,
  Check
} from 'lucide-react';

interface CompanyNavItem {
  name: string;
  slug: string;
  category: string;
  url: string;
  color: string;
  desc: string;
  domain: string;
}

const COMPANIES: CompanyNavItem[] = [
  {
    name: 'Rozena',
    slug: 'rozena',
    category: 'AI Tech & Fashion',
    url: 'https://rozena.co.kr/',
    color: '#9E9E9E',
    desc: 'AI virtual clothing fitting platform (AIVALAPS) & curated soft-grunge fashion.',
    domain: 'rozena.co.kr',
  },
  {
    name: 'Damgara',
    slug: 'damgara',
    category: 'AI Media Art',
    url: 'https://damgara.co.kr/',
    color: '#46B1E1',
    desc: 'STORYSYNC — Real-time AI facade media art transforming memories into mythic visuals.',
    domain: 'damgara.co.kr',
  },
  {
    name: 'Nextep',
    slug: 'nextep',
    category: 'Digital Content & CG',
    url: 'https://nextep.co.kr/',
    color: '#FF3333',
    desc: '3D engine & AI-powered CG video production, VR/AR/MR & immersive media.',
    domain: 'nextep.co.kr',
  },
  {
    name: 'Noeul',
    slug: 'noeul',
    category: 'Contemporary Fashion',
    url: 'https://www.noeul.me/',
    color: '#D4AF37',
    desc: 'Premium Seoul contemporary fashion label with minimalist, sensuous silhouettes.',
    domain: 'noeul.me',
  },
];

import { useLanguage, LANGUAGES, LanguageCode } from '@/context/LanguageContext';

export function LanguageButton({ className = '' }: { className?: string }) {
  const { language, setLanguage, mounted } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const displayShort = mounted ? current.short : 'EN';
  const displayLabel = mounted ? current.label : 'English';

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Select language. Current: ${displayLabel}`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 transition-all cursor-pointer shadow-sm active:scale-95"
      >
        <Globe className="w-3.5 h-3.5 text-zinc-400" />
        <span className="font-mono text-[11px] tracking-wider uppercase font-semibold text-zinc-200">
          {displayShort}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
            open ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 top-full mt-2 w-36 rounded-2xl bg-[#0E1117]/95 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/90 p-1.5 z-[100] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="space-y-0.5">
            {LANGUAGES.map((l) => {
              const isActive = mounted && l.code === language;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(l.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{l.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const COMPANY_TRANSLATIONS: Record<string, {
  category: { en: string; ko: string; zh: string };
  desc: { en: string; ko: string; zh: string };
}> = {
  rozena: {
    category: { en: 'AI Tech & Fashion', ko: 'AI 기술 & 패션', zh: 'AI 技术与时尚' },
    desc: {
      en: 'AI virtual clothing fitting platform (AIVALAPS) & curated soft-grunge fashion.',
      ko: 'AI 가상 의류 피팅 플랫폼 (AIVALAPS) 및 소프트 그런지 감성 스트리트웨어 패션.',
      zh: 'AI 虚拟试衣平台 (AIVALAPS) 与精选柔和颓废风时尚。'
    }
  },
  damgara: {
    category: { en: 'AI Media Art', ko: 'AI 미디어 아트', zh: 'AI 媒体艺术' },
    desc: {
      en: 'STORYSYNC — Real-time AI facade media art transforming memories into mythic visuals.',
      ko: 'STORYSYNC — 실시간 추억을 신화적 비주얼로 승화시키는 AI 미디어 파사드.',
      zh: 'STORYSYNC — 将记忆实时转化为神话级视觉的 AI 媒体立面艺术。'
    }
  },
  nextep: {
    category: { en: 'Digital Content & CG', ko: '디지털 콘텐츠 & CG', zh: '数字内容与 CG' },
    desc: {
      en: '3D engine & AI-powered CG video production, VR/AR/MR & immersive media.',
      ko: '3D 엔진 및 AI 기반 CG 영상 제작, VR/AR/MR 및 몰입형 실감 미디어.',
      zh: '基于 3D 引擎与 AI 的 CG 视频制作、VR/AR/MR 及沉浸式媒体。'
    }
  },
  noeul: {
    category: { en: 'Contemporary Fashion', ko: '컨템포러리 패션', zh: '当代时尚' },
    desc: {
      en: 'Premium Seoul contemporary fashion label with minimalist, sensuous silhouettes.',
      ko: '미니멀하고 감각적인 실루엣의 서울 프리미엄 컨템포러리 패션 레이블.',
      zh: '融合极简与感性剪裁的首尔高端当代时尚品牌。'
    }
  }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { language, setLanguage, mounted } = useLanguage();
  const navRef = useRef<HTMLElement>(null);

  const homeLabel = language === 'ko' ? '홈' : language === 'zh' ? '首页' : 'Home';
  const companiesLabel = language === 'ko' ? '계열사' : language === 'zh' ? '旗下公司' : 'Our Companies';
  const adminLabel = language === 'ko' ? '관리자' : language === 'zh' ? '管理后台' : 'Admin';
  const websiteLabel = language === 'ko' ? '웹사이트' : language === 'zh' ? '官方网站' : 'Website';
  const profileLabel = language === 'ko' ? '소개' : language === 'zh' ? '简介' : 'Profile';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090A]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Group Brand */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation: Only Home and the 4 Company Name Buttons */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-1.5 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner"
            aria-label="Main Navigation"
          >
            {/* Home link */}
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                pathname === '/' && !pathname.includes('/companies')
                  ? 'text-white bg-white/10 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {homeLabel}
            </Link>

            {/* ── 4 COMPANY NAME BUTTONS ── */}
            {COMPANIES.map((co) => {
              const isCurrentCompany = pathname === `/companies/${co.slug}`;
              const isOpen = activeDropdown === co.slug;
              const trans = COMPANY_TRANSLATIONS[co.slug];
              const coCategory = trans?.category[language] || co.category;
              const coDesc = trans?.desc[language] || co.desc;

              return (
                <div
                  key={co.slug}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(co.slug)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Company Name Button */}
                  <Link
                    href={pathname === '/' ? `/#${co.slug}` : `/companies/${co.slug}`}
                    className={`group/btn flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isCurrentCompany
                        ? 'text-white bg-white/15 border border-white/20 shadow-sm'
                        : isOpen
                        ? 'text-white bg-white/10'
                        : 'text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Brand dot */}
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-transform group-hover/btn:scale-125 duration-200"
                      style={{ backgroundColor: co.color }}
                    />
                    <span>{co.name}</span>
                  </Link>

                  {/* Hover / Dropdown Preview Card */}
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="w-72 rounded-2xl bg-[#0E1117]/95 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 p-3.5 text-left overflow-hidden">
                        {/* Top Accent Gradient */}
                        <div
                          className="h-1 -mx-3.5 -mt-3.5 mb-3"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${co.color}, transparent)`,
                          }}
                        />

                        {/* Company Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                              style={{
                                backgroundColor: `${co.color}22`,
                                color: co.color,
                                border: `1px solid ${co.color}44`,
                              }}
                            >
                              {co.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white tracking-wide">
                                {co.name}
                              </h4>
                              <p
                                className="text-[10px] font-mono uppercase tracking-wider"
                                style={{ color: co.color }}
                              >
                                {coCategory}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
                          {coDesc}
                        </p>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10">
                          {/* Official Website */}
                          <a
                            href={co.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] font-semibold text-white transition-colors"
                          >
                            <Globe className="w-3 h-3 text-zinc-400" />
                            <span>{websiteLabel}</span>
                            <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                          </a>

                          {/* Profile Link */}
                          <Link
                            href={`/companies/${co.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-[10px] font-semibold transition-colors"
                          >
                            <span>{profileLabel}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Header Actions: Language Switcher & Admin */}
          <div className="hidden md:flex items-center gap-2.5">
            <LanguageButton />
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>{adminLabel}</span>
            </Link>
          </div>

          {/* Mobile Actions & Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageButton />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 border border-white/10"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0E1117] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  pathname === '/'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {homeLabel}
              </Link>

              {/* ── OUR 4 COMPANIES (MOBILE) ── */}
              <div className="py-2 border-y border-white/10">
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
                  {companiesLabel}
                </p>
                <div className="space-y-1.5">
                  {COMPANIES.map((co) => {
                    const trans = COMPANY_TRANSLATIONS[co.slug];
                    const coCategory = trans?.category[language] || co.category;

                    return (
                      <div
                        key={co.slug}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all"
                      >
                        <Link
                          href={`/companies/${co.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 flex-1 min-w-0"
                        >
                          <div
                            className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                            style={{
                              backgroundColor: `${co.color}22`,
                              color: co.color,
                              border: `1px solid ${co.color}44`,
                            }}
                          >
                            {co.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="truncate">
                            <span className="block text-sm font-semibold text-white">
                              {co.name}
                            </span>
                            <span className="block text-[10px] text-zinc-400 truncate">
                              {coCategory}
                            </span>
                          </div>
                        </Link>

                        <a
                          href={co.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px]"
                          title={`Open ${co.domain}`}
                        >
                          <span className="text-[10px] font-mono text-zinc-500">{co.domain}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Bottom: Language Selector & Admin */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    {language === 'ko' ? '언어 선택' : language === 'zh' ? '语言' : 'Language'}
                  </span>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10"
                  >
                    <Shield className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{adminLabel}</span>
                  </Link>
                </div>
                {/* Segmented language selector */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10">
                  {LANGUAGES.map((l) => {
                    const isSelected = mounted && language === l.code;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => setLanguage(l.code)}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all text-center ${
                          isSelected
                            ? 'bg-white text-black shadow-md'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {l.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
