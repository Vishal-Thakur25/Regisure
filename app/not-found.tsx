import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">404 - Page Not Found</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          The corporate service page or resource you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link href="/">
            <Button variant="amber" size="lg" className="gap-2 text-slate-950 font-bold">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
