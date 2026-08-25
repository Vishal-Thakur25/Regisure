'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, UserCheck, Award, Users, ShieldCheck } from 'lucide-react';
import { useConsultation } from './ConsultationContext';

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
  phoneNumber: string;
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  phoneNumber,
  onOpenConsultation,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { openConsultation } = useConsultation();
  const formattedTel = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;

  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openConsultation();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative bg-brand-950 text-white pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden font-sans border-b border-brand-900">
      {/* Background Banner Image with High Clarity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.png"
          alt="Regisure Corporate CA Solutions"
          fill
          priority
          className="object-cover object-center lg:object-right opacity-80"
          sizes="100vw"
        />
        {/* Soft Navy Gradient Overlay: Legible Left Side Text + High Image Contrast Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/75 via-50% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col items-start text-left"
        >
          {/* Small Category Label (Poppins 600) */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-3 drop-shadow"
          >
            PROFESSIONAL CA SERVICES
          </motion.p>

          {/* Hero Main Heading (Poppins 700) */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md"
          >
            Your Business. <br />
            <span className="text-emerald-400 font-bold">Our Expertise.</span>
          </motion.h1>

          {/* Subtitle Body Text (Poppins 400) */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl drop-shadow"
          >
            We provide all types of CA services including GST Registration, Company Registration, ITR Filing, Compliances & more to support your business growth.
          </motion.p>

          {/* Dual CTA Buttons (Poppins 600) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 w-full sm:w-auto"
          >
            {/* Primary CTA (Navy Pill Button) */}
            <a
              href={formattedTel}
              aria-label={`Call now at ${phoneNumber}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white bg-brand-900 hover:bg-brand-800 rounded-full transition-all border border-brand-700 shadow-xl hover:-translate-y-0.5 active:scale-95 text-center"
            >
              <Phone className="w-5 h-5 text-emerald-400 fill-current" />
              <span>Call Now</span>
            </a>

            {/* Secondary CTA (Regisure Emerald Green Pill Button) */}
            <button
              onClick={handleOpenConsultation}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all shadow-xl shadow-emerald-600/30 hover:-translate-y-0.5 active:scale-95 text-center"
            >
              <UserCheck className="w-5 h-5" />
              <span>Consult Now</span>
            </button>
          </motion.div>

          {/* Floating Experience & Stat Badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-brand-800/60"
          >
            <div className="flex items-center gap-3 bg-brand-950/80 backdrop-blur-md p-4 rounded-2xl border border-brand-800/80 shadow-md">
              <div className="p-2.5 bg-emerald-500/15 text-emerald-400 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none">15+</p>
                <p className="text-xs text-slate-300 font-normal mt-0.5">Years Experience</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-brand-950/80 backdrop-blur-md p-4 rounded-2xl border border-brand-800/80 shadow-md">
              <div className="p-2.5 bg-emerald-500/15 text-emerald-400 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none">2000+</p>
                <p className="text-xs text-slate-300 font-normal mt-0.5">Happy Clients</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-brand-950/80 backdrop-blur-md p-4 rounded-2xl border border-brand-800/80 shadow-md">
              <div className="p-2.5 bg-emerald-500/15 text-emerald-400 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none">100%</p>
                <p className="text-xs text-slate-300 font-normal mt-0.5">Verified Legal Compliance</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
