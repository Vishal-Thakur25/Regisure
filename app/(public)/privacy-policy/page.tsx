import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug } from '@/lib/pages';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageBySlug('privacy-policy');
  return {
    title: pageData.seoTitle || 'Privacy Policy | Regisure India',
    description: pageData.seoDescription || pageData.content,
  };
}

export default async function PrivacyPolicyPage() {
  const pageData = await getPageBySlug('privacy-policy');

  let sections: Array<{ heading: string; text: string }> = [];
  if (pageData.sections) {
    try {
      const parsed = JSON.parse(pageData.sections);
      if (Array.isArray(parsed)) {
        sections = parsed;
      }
    } catch {
      // Fallback
    }
  }

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{pageData.title}</h1>
          {pageData.subtitle && (
            <p className="text-xs text-slate-400 font-mono">{pageData.subtitle}</p>
          )}

          {pageData.content && (
            <p className="text-slate-600 leading-relaxed font-medium">{pageData.content}</p>
          )}

          {sections.map((sec, idx) => (
            <section key={idx} className="space-y-2 pt-2">
              <h2 className="text-xl font-bold text-slate-900">{sec.heading}</h2>
              <p className="whitespace-pre-line leading-relaxed text-slate-600">{sec.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
