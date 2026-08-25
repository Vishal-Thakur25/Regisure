import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { getBusinessSettings } from '@/lib/settings';
import { Hero } from '@/components/public/Hero';
import { ServiceCard } from '@/components/public/ServiceCard';
import { Users, FileCheck2, Award, Headphones, CheckCircle2, Phone, ArrowRight, ShieldCheck, Target, Lock, TrendingUp } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  return {
    title: `FinTax Advisors | Professional CA & Tax Services`,
    description: `Professional CA services including GST registration, company registration, ITR filing, accounting, compliance, trademark registration and more.`,
    openGraph: {
      title: `FinTax Advisors | Professional CA & Tax Services`,
      description: `Professional CA services including GST registration, company registration, ITR filing, accounting, compliance, trademark registration and more.`,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: `FinTax Advisors`,
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const currentSettings = await getBusinessSettings();

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
      take: 8,
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

  const formattedTel = `tel:${currentSettings.phone_number.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="font-sans bg-white">
      {/* 1. Hero Section */}
      <Hero
        heroTitle={currentSettings.hero_title}
        heroSubtitle={currentSettings.hero_subtitle}
        phoneNumber={currentSettings.phone_number}
      />

      {/* 2. Services Section */}
      <section className="py-20 bg-[#F7F9FC] relative" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              OUR SERVICES
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092A52] tracking-tight">
              Complete CA Solutions Under One Roof
            </h2>
            <div className="w-16 h-1 bg-[#D99A16] rounded-full mx-auto mt-3" />
          </div>

          {/* 8-Card Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* 3. Dark Navy Statistics / Trust Bar */}
          <div className="mt-16 bg-[#061F3D] text-white rounded-3xl p-8 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, stat: '2000+', label: 'Happy Clients' },
              { icon: FileCheck2, stat: '5000+', label: 'Projects Completed' },
              { icon: Award, stat: '15+', label: 'Years of Experience' },
              { icon: Headphones, stat: '24/7', label: 'Customer Support' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-4 border-b sm:border-b-0 sm:border-r border-[#092A52] last:border-none pb-6 sm:pb-0"
              >
                <div className="p-3 bg-[#D99A16]/20 border border-[#D99A16]/30 text-[#D99A16] rounded-2xl shrink-0">
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <p className="text-3xl font-bold text-white tracking-tight">{item.stat}</p>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Us & Why Choose Us Section */}
      <section className="py-20 bg-white relative" id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Block: About Us */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                  ABOUT US
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#092A52] tracking-tight leading-tight">
                  We Help You Focus on Your Business, We’ll Handle the Rest
                </h2>
              </div>

              <p className="text-[#667085] text-sm sm:text-base font-normal leading-relaxed">
                RegisureIndia is a leading CA firm providing end-to-end financial and compliance solutions to individuals, startups, SMEs and companies. Our goal is to deliver expert services with transparency, accuracy and commitment.
              </p>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold  bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4 text-[#D99A16]" />
                </Link>
              </div>

              {/* Accounting Photo Thumbnail */}
              <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-md border border-[#E6EAF0]">
                <Image
                  src="/images/hero-banner.png"
                  alt="FinTax Advisors Financial Consultation Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Block: Why Choose Us */}
            <div className="lg:col-span-6 space-y-6 text-left relative">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                  WHY CHOOSE US
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#092A52] tracking-tight leading-tight">
                  We are Committed to Your Success
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2 relative z-10">
                {[
                  { title: 'Expert CA Professionals', icon: ShieldCheck },
                  { title: 'Timely & Accurate Services', icon: Target },
                  { title: 'Affordable Pricing', icon: Award },
                  { title: '100% Client Satisfaction', icon: CheckCircle2 },
                  { title: 'Confidential & Secure', icon: Lock },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 p-3.5 bg-[#F7F9FC] rounded-xl border border-[#E6EAF0]">
                    <CheckCircle2 className="w-5 h-5 text-[#D99A16] shrink-0" />
                    <span className="text-[#172033] font-semibold text-sm sm:text-base">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Growth Target Watermark Graphic */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none z-0">
                <TrendingUp className="w-48 h-48 text-[#D99A16]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-Footer Call to Action Banner */}
      <section className="bg-[#061F3D] py-10 text-white relative font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Phone className="w-7 h-7 fill-current" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Need Expert CA Advice?</h3>
              <p className="text-slate-300 text-xs sm:text-sm font-normal">
                Call us now or book a consultation with our experts today!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={formattedTel}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5"
            >
              Call Now
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-transparent hover:bg-[#092A52] text-white border border-white/60 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              Consult Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
