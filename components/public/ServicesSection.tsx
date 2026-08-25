'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceCard, ServiceData } from './ServiceCard';
import { ArrowRight, Layers } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceData[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Database Driven Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Corporate & Legal Solutions
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Comprehensive incorporation, GST, trademark, and statutory filing services tailored for Indian startups and enterprises.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-sm group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto">
            <p className="text-slate-600 text-base font-medium">No published services currently available.</p>
            <p className="text-slate-400 text-xs mt-1">Please check back soon or contact our support team.</p>
          </div>
        )}
      </div>
    </section>
  );
};
