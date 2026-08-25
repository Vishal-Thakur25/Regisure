'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Briefcase, PlusCircle, Users, Settings, LogOut, ExternalLink, FileText } from 'lucide-react';
import { logoutAdminAction } from '@/actions/auth-actions';

interface AdminSidebarProps {
  currentAdminName?: string;
  currentAdminEmail?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentAdminName = 'Administrator',
  currentAdminEmail = 'admin@regisure.com',
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Add Service', href: '/admin/services/new', icon: PlusCircle },
    { name: 'Leads & Enquiries', href: '/admin/leads', icon: Users },
    { name: 'Manage Pages', href: '/admin/pages', icon: FileText },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];


  const handleLogout = async () => {
    await logoutAdminAction();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-brand-900 border-r border-brand-800 flex flex-col justify-between min-h-screen text-slate-300 font-sans">
      {/* Brand Logo */}
      <div>
        <div className="p-6 border-b border-brand-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 bg-white rounded-full p-0.5 border border-emerald-500 shadow-md">
              <Image
                src="/images/logo.png"
                alt="Regisure Logo"
                fill
                className="object-contain p-0.5 rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight leading-none">
                REGI<span className="text-emerald-500">SURE</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Admin Console</span>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-brand-800 transition-colors"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:bg-brand-800 hover:text-white font-normal'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-brand-800 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2 bg-brand-950 rounded-xl border border-brand-800">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
            {currentAdminName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{currentAdminName}</p>
            <p className="text-[10px] text-slate-400 truncate font-normal">{currentAdminEmail}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
