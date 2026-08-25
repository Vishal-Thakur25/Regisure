'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { loginAdminAction } from '@/actions/auth-actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [email, setEmail] = useState('admin@regisure.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const res = await loginAdminAction(formData);

    setIsLoading(false);

    if (res.success) {
      router.push(callbackUrl);
      router.refresh();
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md bg-brand-900 border border-brand-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 bg-white rounded-full p-0.5 border border-emerald-500 shadow-md mx-auto">
            <Image
              src="/images/logo.png"
              alt="Regisure Logo"
              fill
              className="object-contain p-0.5 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight pt-2">Admin Portal Login</h1>
          <p className="text-xs text-slate-400 font-normal">Enter your secure credentials to manage Regisure India</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@regisure.com"
                className="w-full pl-10 pr-4 py-3 bg-brand-950 border border-brand-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors font-normal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-brand-950 border border-brand-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors font-normal"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="amber"
              size="lg"
              isLoading={isLoading}
              className="w-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg"
            >
              Sign In to Admin Console
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-brand-800 text-center text-xs text-slate-400 space-y-1 font-normal">
          <p>🔒 Protected by JWT session cookies & rate-limiting.</p>
          <p className="text-[11px] text-slate-400">Dev Credential Seed: <code className="text-emerald-400 font-mono">admin@regisure.com</code> / <code className="text-emerald-400 font-mono">AdminSecret123!</code></p>
        </div>
      </div>
    </div>
  );
}
