'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useConsultation } from './ConsultationContext';

interface AboutClientWrapperProps {
  phoneNumber: string;
}

export const AboutClientWrapper: React.FC<AboutClientWrapperProps> = ({
  phoneNumber,
}) => {
  const { openConsultation } = useConsultation();
  const formattedTel = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="bg-brand-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 font-sans">
      <div className="max-w-xl text-left">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-white">
          Partner with India's Premier Corporate Experts
        </h3>
        <p className="text-slate-300 text-sm font-normal leading-relaxed">
          Have questions about company structure, GST registration limits, or annual secretarial audits? Book your free advisory session now.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
        <a
          href={formattedTel}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-950 hover:bg-brand-800 text-white rounded-full text-sm font-semibold transition-colors border border-brand-800"
        >
          <Phone className="w-4 h-4 text-emerald-400 fill-current" />
          <span>Call Now</span>
        </a>

        <Button
          variant="amber"
          size="lg"
          onClick={() => openConsultation()}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xl rounded-full border-none"
        >
          <Calendar className="w-5 h-5 text-white" />
          <span>Consult Now</span>
        </Button>
      </div>
    </div>
  );
};
