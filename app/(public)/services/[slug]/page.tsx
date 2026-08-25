import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getBusinessSettings } from '@/lib/settings';
import { ServiceDetailClientWrapper } from '@/components/public/ServiceDetailClientWrapper';
import { CheckCircle2, ShieldCheck, ArrowLeft, Phone, Calendar, Clock, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ServiceDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const service = await prisma.service.findFirst({
    where: { slug: params.slug, status: 'PUBLISHED' },
  });

  if (!service) {
    return {
      title: 'Service Not Found | Regisure India',
    };
  }

  const settings = await getBusinessSettings();

  return {
    title: service.seoTitle || `${service.name} | ${settings.business_name}`,
    description: service.seoDescription || service.shortDescription,
    openGraph: {
      title: service.seoTitle || service.name,
      description: service.seoDescription || service.shortDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/services/${service.slug}`,
      images: service.image ? [{ url: service.image }] : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const service = await prisma.service.findFirst({
    where: { slug: params.slug, status: 'PUBLISHED' },
  });

  if (!service) {
    notFound();
  }

  const settings = await getBusinessSettings();

  // Safely parse JSON string arrays
  const parseJsonArray = (strVal: string): string[] => {
    try {
      return JSON.parse(strVal);
    } catch {
      return [];
    }
  };

  const benefits: string[] = parseJsonArray(service.benefits);
  const features: string[] = parseJsonArray(service.features);
  const processSteps: string[] = parseJsonArray(service.process);

  const formattedTel = `tel:${settings.phone_number.replace(/[^0-9+]/g, '')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: settings.business_name,
      telephone: settings.phone_number,
    },
    areaServed: 'IN',
    offers: service.price
      ? {
          '@type': 'Offer',
          price: service.price,
          priceCurrency: 'INR',
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Back Link */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Header Title Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">
                    Statutory Compliance
                  </span>
                  {service.price && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                      Price: {service.price}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {service.name}
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              {/* Featured Image */}
              {service.image && (
                <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                </div>
              )}

              {/* Full Description Section */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-brand-600" />
                  <span>Service Overview</span>
                </h2>
                <div className="text-slate-700 leading-relaxed whitespace-pre-line space-y-4 text-base">
                  {service.description}
                </div>
              </div>

              {/* Benefits Section */}
              {benefits.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    <span>Key Business Benefits</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-800 leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features Checklist */}
              {features.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-6 h-6 text-brand-600" />
                    <span>What's Included in Package</span>
                  </h2>
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 p-3 bg-brand-50/50 rounded-xl text-slate-800 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process Step-by-Step Workflow */}
              {processSteps.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-brand-600" />
                    <span>Step-by-Step Filing Workflow</span>
                  </h2>
                  <div className="space-y-4">
                    {processSteps.map((step, i) => (
                      <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-4">
                        <span className="w-8 h-8 rounded-xl bg-brand-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar CTA Box (4 cols) */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              {/* Interactive Action Card */}
              <ServiceDetailClientWrapper
                serviceName={service.name}
                phoneNumber={settings.phone_number}
                formattedTel={formattedTel}
                price={service.price}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
