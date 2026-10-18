import { isAdminAuthenticated } from '@/lib/auth';
import AdminLogin from './AdminLogin';
import AdminDashboardClient from './AdminDashboardClient';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  getCompanies,
  getContactMessages,
  getProjects,
  getServices,
  getSiteSettings,
  getVideoJobs
} from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console — NEXORA GROUP',
  description: 'Executive management portal for Nexora Group companies, content, and video workflows.'
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();
  const companies = await getCompanies();

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#08090A] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <AdminLogin onLoginSuccess={() => {}} />
        </main>
        <Footer companies={companies} />
      </div>
    );
  }

  const [settings, projects, services, messages, jobs] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getServices(),
    getContactMessages(),
    getVideoJobs()
  ]);

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdminDashboardClient
          initialCompanies={companies}
          initialSettings={settings}
          initialProjects={projects}
          initialServices={services}
          initialMessages={messages}
          initialJobs={jobs}
        />
      </main>

      <Footer companies={companies} />
    </div>
  );
}
