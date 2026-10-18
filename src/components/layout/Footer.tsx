import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { Company } from '@/types';
import { ArrowUpRight, Lock } from 'lucide-react';

interface FooterProps {
  companies: Company[];
}

export default function Footer({ companies }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#08090A] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Group Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mt-3">
              A modern multi-venture corporate portfolio uniting AI platforms, immersive media art, 3D CG production, and contemporary fashion under one shared standard of excellence.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All 4 Portfolio Companies Active</span>
            </div>
          </div>

          {/* Portfolio Companies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-200 mb-4">
              Our Companies
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
                          Profile
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
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#companies" className="hover:text-white transition-colors">
                  Company Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-zinc-500"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {currentYear} NEXORA GROUP. All rights reserved. Corporate portfolio and multi-venture digital platform.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
