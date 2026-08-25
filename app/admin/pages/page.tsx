import React from 'react';
import Link from 'next/link';
import { getAllPages } from '@/lib/pages';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { FileText, Edit3, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

export default async function AdminPagesIndex() {
  const pages = await getAllPages();

  const pageIcons: Record<string, typeof FileText> = {
    about: FileText,
    'privacy-policy': ShieldCheck,
    'terms-and-conditions': FileCheck,
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Dynamic Page Content Management"
        subtitle="Manage About Us, Privacy Policy, and Terms & Conditions dynamically in MySQL database."
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page) => {
            const Icon = pageIcons[page.slug] || FileText;
            return (
              <div
                key={page.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full tracking-wider">
                        /{page.slug}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mt-2 line-clamp-1">{page.title}</h2>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{page.content}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {page.updatedAt ? `Updated: ${new Date(page.updatedAt).toLocaleDateString()}` : 'Stored in MySQL'}
                  </span>
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
