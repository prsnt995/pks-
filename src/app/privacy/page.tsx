import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getCompanies } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — NEXORA GROUP',
  description: 'Corporate privacy policy for Nexora Group and its portfolio member companies.'
};

export default async function PrivacyPage() {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest">
            Legal Transparency
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-400 mt-2 font-mono">
            Last updated: October 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-8">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Overview</h2>
            <p>
              This Privacy Policy explains how NEXORA GROUP (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) handles information transmitted through our corporate website, communication interfaces, and portfolio venture representations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Inquiries and Transmission Data</h2>
            <p>
              When you submit a message through our contact portal, we collect your name, corporate email address, organization name, subject, and message content. This information is utilized solely to evaluate and respond to your inquiry.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Portfolio Company Links</h2>
            <p>
              Our website links to official websites of independent portfolio ventures. Once you navigate to external member company domains, their respective privacy policies and terms govern your browsing experience.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. AI Video Studio Media</h2>
            <p>
              Promotional video assets generated through our AI Video Studio are processed through server-side authenticated APIs. Prompts and creative instructions are transmitted securely to authorized model providers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Direct Inquiries</h2>
            <p>
              For data privacy inquiries or deletion requests, please contact our administrative communications desk at: <strong className="text-white">contact@nexoragroup.com</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer companies={companies} />
    </div>
  );
}
