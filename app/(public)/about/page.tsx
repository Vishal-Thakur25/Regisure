import React from 'react';
import { Metadata } from 'next';
import { getBusinessSettings } from '@/lib/settings';
import { AboutClientWrapper } from '@/components/public/AboutClientWrapper';
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  return {
    title: `About Us | ${settings.business_name}`,
    description:
      'Learn more about Regisure India, our mission, vision, core legal values, and certified chartered accountant leadership.',
  };
}

export default async function AboutPage() {
  const currentSettings = await getBusinessSettings();

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold mb-3">
            <Award className="w-4 h-4" />
            <span>Pioneering Corporate Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Empowering Indian Enterprises to Scale Seamlessly
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Regisure India was founded with a singular vision: to liberate entrepreneurs from tedious government bureaucracy and statutory legal friction through technology, transparency, and top-tier chartered accountancy.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              To deliver 100% digital, fast, and bulletproof legal incorporation, GST, trademark, and tax secretarial compliance to every growing business in India with total cost transparency.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              To become the single most trusted statutory partner and compliance operating system for over 100,000 corporate enterprises across India by 2030.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm mb-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Foundational Core Values
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              The non-negotiable principles guiding every client filing and legal document.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Absolute Integrity', desc: 'No hidden government fees or surprise upsells. Complete upfront pricing transparency.' },
              { title: 'Statutory Rigor', desc: 'Every application is thoroughly audited by certified CAs and advocates before submission.' },
              { title: 'Speed & Execution', desc: 'Rapid SLA turnarounds with automated MCA, GST, and IP portal tracking updates.' },
              { title: 'Client Confidentiality', desc: 'Bank-grade encryption protecting your personal financial identity documents.' },
              { title: 'Proactive Advisory', desc: 'We notify you well before compliance due dates so you never incur ROC penalties.' },
              { title: 'Lifelong Partnership', desc: 'From day 1 incorporation to series funding statutory audits, we stand by your company.' },
            ].map((val, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-brand-600 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{val.title}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner Wrapper */}
        <AboutClientWrapper phoneNumber={currentSettings.phone_number} />
      </div>
    </div>
  );
}
