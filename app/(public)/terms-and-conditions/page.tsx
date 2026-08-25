import React from 'react';
import { Metadata } from 'next';
import { getBusinessSettings } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  return {
    title: `Terms & Conditions | ${settings.business_name}`,
    description: `Terms and conditions governing the corporate consultancy services provided by ${settings.business_name}.`,
  };
}

export default async function TermsAndConditionsPage() {
  const settings = await getBusinessSettings();

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terms & Conditions</h1>
          <p className="text-xs text-slate-400 font-mono">Last Updated: January 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing our website or retaining {settings.business_name} for incorporation, GST, trademark, or secretarial services, you agree to comply with and be bound by these terms and conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Professional Consultancy Services</h2>
            <p>
              {settings.business_name} acts as a professional legal and corporate advisory facilitator. Statutory approval timelines (MCA COI, GSTIN, FSSAI) are subject to government portal processing schedules and government officer verification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Client Responsibilities</h2>
            <p>
              Clients are responsible for providing authentic, accurate, and un-tampered identity, address proof, and corporate documents. {settings.business_name} is not liable for statutory rejections resulting from fraudulent or incorrect client submissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Govering Law</h2>
            <p>
              These terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of these services shall be subject to the exclusive jurisdiction of the courts in Delhi NCR, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
