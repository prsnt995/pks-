'use client';

import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { Company } from '@/types';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  companies: Company[];
}

export default function Footer({ companies }: FooterProps) {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const labels = {
    en: {
      desc: 'A modern multi-venture corporate portfolio uniting AI platforms, immersive media art, 3D CG production, and contemporary fashion under one shared standard of excellence.',
      activeStatus: 'All 4 Portfolio Companies Active',
      companies: 'Our Companies',
      profile: 'Profile',
      platform: 'Platform',
      directory: 'Company Directory',
      admin: 'Admin Portal',
      rights: 'All rights reserved. Corporate portfolio and multi-venture digital platform.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    ko: {
      desc: 'AI 플랫폼, 몰입형 미디어 아트, 3D CG 영상 제작, 컨템포러리 패션을 아우르는 혁신적인 멀티 벤처 기업 포트폴리오입니다.',
      activeStatus: '4개 계열사 모두 정상 운영 중',
      companies: '계열사',
      profile: '소개',
      platform: '플랫폼',
      directory: '기업 디렉터리',
      admin: '관리자 포털',
      rights: '모든 권리 보유. 기업 포트폴리오 및 멀티 벤처 디지털 플랫폼.',
      privacy: '개인정보 처리방침',
      terms: '이용약관'
    },
    zh: {
      desc: '涵盖 AI 平台、沉浸式媒体艺术、3D CG 制作及当代时尚的现代化多元企业投资矩阵，以同一卓越标准协同前行。',
      activeStatus: '全部 4 家企业正常运营',
      companies: '旗下公司',
      profile: '简介',
      platform: '平台',
      directory: '企业名录',
      admin: '管理后台',
      rights: '版权所有。企业投资组合与多元创新数字化平台。',
      privacy: '隐私政策',
      terms: '服务条款'
    }
  }[language];

  return (
    <footer className="border-t border-white/10 bg-[#08090A] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Group Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-3">
              {labels.desc}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{labels.activeStatus}</span>
            </div>
          </div>

          {/* Portfolio Companies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-200 mb-4">
              {labels.companies}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {companies.map((c) => {
                const isVerified = Boolean(
                  c.website_verified && c.official_url && c.official_url.trim().length > 0
                );
                return (
                  <li key={c.id}>
                    {isVerified ? (
                      <a
                        href={c.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                        aria-label={`Visit official website for ${c.name} (opens in new tab)`}
                      >
                        <span>{c.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
                      </a>
                    ) : (
                      <Link
                        href={`/companies/${c.slug}`}
                        className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{c.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono px-1.5 py-0.2 rounded bg-white/5 border border-white/5">
                          {labels.profile}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-200 mb-4">
              {labels.platform}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#companies" className="hover:text-white transition-colors">
                  {labels.directory}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-zinc-500"
                >
                  <Lock className="w-3 h-3" />
                  <span>{labels.admin}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {currentYear} NEXORA GROUP. {labels.rights}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              {labels.privacy}
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              {labels.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
