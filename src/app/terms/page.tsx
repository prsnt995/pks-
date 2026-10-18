import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getCompanies } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — NEXORA GROUP',
  description: 'Terms of service and portfolio representation terms for Nexora Group.'
};

export default async function TermsPage() {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">
            Corporate Terms
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            Terms of Service
          </h1>
          <p className="text-xs text-zinc-400 mt-2 font-mono">
            Last updated: October 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-8">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Brand & Portfolio Representation</h2>
            <p>
              NEXORA GROUP is a corporate brand and business portfolio that showcases four independent commercial ventures (PKS.ENG, Nextepstudio, Rozena, and emerging stealth initiatives). Unless specifically noted, member ventures operate under independent business registrations and commercial agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. External Links & Verified Websites</h2>
            <p>
              Where external official website URLs are verified, clicking external links will open third-party web domains operated by respective venture management. Nexora Group assumes no liability for external terms, services, or content hosted on independent third-party servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Intellectual Property</h2>
            <p>
              The NEXORA GROUP custom wordmark, visual identity, software code, and promotional studio systems are proprietary intellectual assets. Unapproved reproduction or redistribution is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Demonstration Content Disclosure</h2>
            <p>
              Certain prototypes, video samples, and concept previews on this website are explicitly designated as demonstration showcases to illustrate prospective capabilities.
            </p>
          </section>
        </div>
      </main>

      <Footer companies={companies} />
    </div>
  );
}
