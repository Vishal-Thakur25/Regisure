'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, FileText, ShieldCheck, Award, Utensils, CheckCircle2, Briefcase, Calculator, Landmark, FileSpreadsheet } from 'lucide-react';

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image?: string | null;
  icon?: string | null;
  price?: string | null;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  FileText,
  ShieldCheck,
  Award,
  Utensils,
  CheckCircle2,
  Briefcase,
  Calculator,
  Landmark,
  FileSpreadsheet,
};

interface ServiceCardProps {
  service: ServiceData;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = (service.icon && iconMap[service.icon]) || Briefcase;

  return (
    <div className="group bg-white rounded-2xl p-6 border border-[#E6EAF0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between text-center h-full relative font-sans">
      {/* Circular Light-Gray Icon Container */}
      <div className="w-16 h-16 rounded-full bg-[#F7F9FC] border border-[#E6EAF0] text-[#092A52] flex items-center justify-center mb-4 group-hover:bg-emerald-100 group-hover:border-emerald-600 group-hover:text-emerald-600 transition-all duration-300 shadow-sm">
        <IconComponent className="w-7 h-7" />
      </div>

      {/* Service Title (Poppins 600) & Description (Poppins 400) */}
      <div className="flex-1 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-[#092A52] group-hover:text-emerald-600 transition-colors line-clamp-1 mb-2">
          {service.name}
        </h3>
        <p className="text-[#667085] text-xs font-normal leading-relaxed line-clamp-3 mb-6">
          {service.shortDescription}
        </p>
      </div>

      {/* Bottom "Learn More →" Link (Poppins 600) */}
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#092A52] group-hover:text-emerald-600 transition-colors"
      >
        <span>Learn More</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
