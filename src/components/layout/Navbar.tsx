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
  Shield 
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

function SiteLanguageSelector() {
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    const update = () => setLanguage(window.localStorage.getItem('psk-language') || 'en');
    update();
    window.addEventListener('psk-language-change', update);
    return () => window.removeEventListener('psk-language-change', update);
  }, []);
  return (
    <div className="flex items-center gap-2 rounded-full border border-cyan-300/25 bg-[#10162a]/80 px-3 py-2 text-xs text-cyan-200">
      <Globe className="h-4 w-4" aria-hidden="true" />
      <label className="sr-only" htmlFor="nav-site-language">Homepage language</label>
      <select id="nav-site-language" aria-label="Homepage language" value={language} onChange={(event) => {
        setLanguage(event.target.value);
        window.localStorage.setItem('psk-language', event.target.value);
        window.dispatchEvent(new Event('psk-language-change'));
      }} className="max-w-24 cursor-pointer bg-transparent text-white outline-none">
        <option value="en" className="bg-[#10162a]">English</option>
        <option value="ko" className="bg-[#10162a]">한국어</option>
        <option value="zh" className="bg-[#10162a]">中文</option>
      </select>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [siteLanguage, setSiteLanguage] = useState('en');
  useEffect(() => {
    const sync = () => setSiteLanguage(window.localStorage.getItem('psk-language') || 'en');
    sync();
    window.addEventListener('psk-language-change', sync);
    return () => window.removeEventListener('psk-language-change', sync);
  }, []);
  const homeLabel = siteLanguage === 'ko' ? '홈' : siteLanguage === 'zh' ? '首页' : 'Home';
  const companiesLabel = siteLanguage === 'ko' ? '계열사' : siteLanguage === 'zh' ? '旗下公司' : 'Our Companies';
  const navRef = useRef<HTMLElement>(null);

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

              return (
                <div
                  key={co.slug}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(co.slug)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Company Name Button */}
                  <Link
                    href={`/companies/${co.slug}`}
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
                                {co.category}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
                          {co.desc}
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
                            <span>Website</span>
                            <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                          </a>

                          {/* Profile Link */}
                          <Link
                            href={`/companies/${co.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-[10px] font-semibold transition-colors"
                          >
                            <span>Profile</span>
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

          {/* Admin shortcut button as shown in design */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
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
                  {COMPANIES.map((co) => (
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
                            {co.category}
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
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <SiteLanguageSelector />
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10"
                >
                  <Shield className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
