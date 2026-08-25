import React from 'react';
import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { getBusinessSettings } from '@/lib/settings';
import { ServicesSearchGrid } from '@/components/public/ServicesSearchGrid';
import { Layers } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  return {
    title: `Corporate Services & Registrations | ${settings.business_name}`,
    description:
      'Explore our full suite of incorporation, GST, trademark, food license, ISO quality, and annual secretarial ROC compliance services in India.',
    openGraph: {
      title: `All Corporate & Legal Services | ${settings.business_name}`,
      description:
        'Fast-track your business incorporation and corporate compliance with expert CAs & attorneys.',
    },
  };
}

export default async function ServicesPage() {
  let services: Array<{
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    image?: string | null;
    icon?: string | null;
    price?: string | null;
  }> = [];

  try {
    const servicesRaw = await prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' },
    });

    services = servicesRaw.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      shortDescription: s.shortDescription,
      image: s.image,
      icon: s.icon,
      price: s.price,
    }));
  } catch {
    services = [];
  }

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Corporate Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Corporate Services
          </h1>
          <p className="text-slate-600 text-base mt-4 leading-relaxed">
            All-in-one compliance solutions designed for Indian startups, MSMEs, and established private enterprises. Handled end-to-end by certified CAs and legal advisors.
          </p>
        </div>

        {/* Interactive Search & Grid */}
        <ServicesSearchGrid services={services} />
      </div>
    </div>
  );
}
