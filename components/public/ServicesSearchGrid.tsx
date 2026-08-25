'use client';

import React, { useState } from 'react';
import { ServiceCard, ServiceData } from './ServiceCard';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useConsultation } from './ConsultationContext';

interface ServicesSearchGridProps {
  services: ServiceData[];
}

export const ServicesSearchGrid: React.FC<ServicesSearchGridProps> = ({ services }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { openConsultation } = useConsultation();

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Search & Filter Control Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services (e.g. NGO, GST, Trademark, Company Registration)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-normal"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 w-full sm:w-auto justify-between sm:justify-start">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            Showing {filteredServices.length} of {services.length} services
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-emerald-600 hover:underline text-xs font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-12">
          <p className="text-slate-900 text-lg font-bold">No matching services found</p>
          <p className="text-slate-500 text-sm mt-1 mb-6 font-normal">
            We couldn't find any service matching "{searchQuery}".
          </p>
          <Button variant="outline" size="md" onClick={() => setSearchQuery('')}>
            Reset Search Filter
          </Button>
        </div>
      )}

      {/* Bottom CTA Banner in Dark Navy & Emerald */}
      <div className="bg-brand-900 border border-brand-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="max-w-xl text-left">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-white">
            Can't find what you're looking for?
          </h3>
          <p className="text-slate-300 text-sm font-normal leading-relaxed">
            Our corporate attorneys handle custom compliance matters, foreign direct investment (FDI) approvals, joint ventures, and specialized legal opinions.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => openConsultation()}
          className="gap-2 shrink-0 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-xl"
        >
          <span>Consult Now</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
