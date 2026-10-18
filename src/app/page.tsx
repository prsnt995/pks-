export const revalidate = 60;

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import { getCompanies, getSiteSettings } from '@/lib/db';

export default async function HomePage() {
  const [companies, settings] = await Promise.all([
    getCompanies(),
    getSiteSettings()
  ]);

  const activeCompanies = companies.filter((c) => c.is_active);

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1">
        <HeroSection
          headline={settings.hero_headline}
          subheadline={settings.hero_subheadline}
          description={settings.hero_description}
        />
      </main>

      <Footer companies={activeCompanies} />
    </div>
  );
}
