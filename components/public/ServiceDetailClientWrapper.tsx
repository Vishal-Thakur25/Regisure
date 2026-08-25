'use client';

import React, { useState } from 'react';
import { Phone, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConsultationModal } from './ConsultationModal';

interface ServiceDetailClientWrapperProps {
  serviceName: string;
  phoneNumber: string;
  formattedTel: string;
  price?: string | null;
}

export const ServiceDetailClientWrapper: React.FC<ServiceDetailClientWrapperProps> = ({
  serviceName,
  phoneNumber,
  formattedTel,
  price,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
            Instant CA Assistance
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Apply for {serviceName}
          </h3>
          {price && (
            <p className="text-3xl font-extrabold text-amber-400 pt-2">
              {price}
            </p>
          )}
          <p className="text-slate-400 text-xs leading-relaxed">
            Get your application verified and filed with MCA / Govt servers by senior legal specialists.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {/* CALL NOW BUTTON */}
          <a
            href={formattedTel}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-colors border border-slate-700 shadow-md"
          >
            <Phone className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Call Now: {phoneNumber}</span>
          </a>

          {/* CONSULTANT NOW BUTTON */}
          <Button
            variant="amber"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="w-full gap-2 text-slate-950 font-bold shadow-xl"
          >
            <Calendar className="w-5 h-5" />
            <span>Consultant Now</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Confidential & Secure Data</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dedicated CA Account Manager</span>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={serviceName}
      />
    </>
  );
};
