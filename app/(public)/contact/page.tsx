import React from 'react';
import { Metadata } from 'next';
import { getBusinessSettings } from '@/lib/settings';
import { prisma } from '@/lib/db';
import { ContactForm } from '@/components/public/ContactForm';
import { Phone, Mail, MapPin, Clock, Headset } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  return {
    title: `Contact Us | ${settings.business_name}`,
    description: `Get in touch with ${settings.business_name}. Call us at ${settings.phone_number} or send a message for instant legal and corporate advice.`,
  };
}

export default async function ContactPage() {
  const currentSettings = await getBusinessSettings();

  let serviceNames: string[] = [];
  try {
    const services = await prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      select: { name: true },
      orderBy: { sortOrder: 'asc' },
    });
    serviceNames = services.map((s) => s.name);
  } catch {
    serviceNames = [
      'NGO Registration',
      'Private Limited Company',
      'LLP Registration',
      'OPC Registration',
      'Annual Compliances',
      'GST Registration & Filing',
      'ITR Filing',
      '12A & 80G Registration',
      'NITI Aayog Darpan Registration',
      'CSR Registration (Form CSR-1)',
      'E-Anudaan Registration',
      'FSSAI Food License',
      'Trademark Registration',
      'ISO Certification',
      'Import Export Code (IEC)',
      'Audit Report',
    ];
  }

  const formattedTel = `tel:${currentSettings.phone_number.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-3">
            <Headset className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch with Our Corporate Advisory Team
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Have a question regarding incorporation, GST notice resolution, trademark filing, or secretarial audits? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Corporate Office Contact Info
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-brand-100 text-brand-600 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Phone Hotline</p>
                    <a
                      href={formattedTel}
                      className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors block mt-0.5"
                    >
                      {currentSettings.phone_number}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-brand-100 text-brand-600 rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Email Address</p>
                    <a
                      href={`mailto:${currentSettings.email}`}
                      className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors block mt-0.5"
                    >
                      {currentSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-brand-100 text-brand-600 rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Headquarters Address</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
                      {currentSettings.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-brand-100 text-brand-600 rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Working Hours</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {currentSettings.working_hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Call Action Button */}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={formattedTel}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4 animate-pulse" />
                  <span>Call Us Right Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form Component (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm servicesList={serviceNames} />
          </div>
        </div>

        {/* Embedded Interactive Map Placeholder */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-center space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-600" />
              <span>Location Map & Office Visit</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Cyber City, Delhi NCR</span>
          </div>

          <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-slate-500 space-y-2 p-6">
            <MapPin className="w-10 h-10 text-brand-500 animate-bounce" />
            <p className="text-sm font-bold text-slate-800">{currentSettings.business_name}</p>
            <p className="text-xs text-slate-500 max-w-md">{currentSettings.address}</p>
            <p className="text-[11px] text-brand-600 font-semibold pt-2">
              📍 Visitors welcomed by appointment. Book your consultation in advance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
