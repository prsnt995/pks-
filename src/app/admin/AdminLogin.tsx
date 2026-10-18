'use client';

import { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { NexoraLogoMark } from '@/components/brand/Logo';

export default function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication rejected');
      }

      onLoginSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0E1117] border border-white/10 shadow-2xl space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mx-auto">
            <NexoraLogoMark className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            NEXORA GROUP
          </h2>
          <p className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
            Administrative Management Console
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
              Administrator Access Secret Key
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter administrative credentials..."
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Enter the administrator secret configured for this deployment.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Verifying Authorization...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protected by server-side HttpOnly session tokens</span>
          </div>
        </div>
      </div>
    </div>
  );
}
