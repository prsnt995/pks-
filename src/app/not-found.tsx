import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { NexoraLogoMark } from '@/components/brand/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
        <NexoraLogoMark className="w-10 h-10 text-white" />
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
        Error 404 &bull; Entity Not Found
      </span>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
        Page Does Not Exist
      </h1>

      <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed mb-8">
        The requested resource, venture profile, or studio asset could not be located in the Nexora Group network.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Corporate Homepage</span>
      </Link>
    </div>
  );
}
