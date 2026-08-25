import React from 'react';
import { Metadata } from 'next';
import { getBusinessSettings } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  return {
    title: `Privacy Policy | ${settings.business_name}`,
    description: `Privacy Policy and data protection commitments of ${settings.business_name}.`,
  };
}

export default async function PrivacyPolicyPage() {
  const settings = await getBusinessSettings();

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400 font-mono">Last Updated: January 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              At {settings.business_name}, we take your data privacy seriously. When you use our consultation forms, contact forms, or legal services, we collect personal details including your full name, phone number, email address, corporate identity documents, and business details necessary for MCA, GST, and statutory filings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              Your information is exclusively used to provide corporate incorporation, tax registration, intellectual property filing, and annual secretarial compliance services. We do not sell or trade your data to third-party advertisers under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Data Security & Storage</h2>
            <p>
              We implement industry-standard AES-256 SSL encryption and secure server access protocols. Access to identity documents (PAN, Aadhaar, Passport) is strictly restricted to certified CAs and legal associates managing your statutory filings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Contacting Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may contact our Compliance Officer at {settings.email} or call us at {settings.phone_number}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
