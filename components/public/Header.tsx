'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { useConsultation } from './ConsultationContext';

interface HeaderProps {
  phoneNumber: string;
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ phoneNumber, onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openConsultation } = useConsultation();

  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openConsultation();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'About Us', href: '/about' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Blog', href: '/#services' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const formattedTel = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md h-[80px] flex items-center border-b border-slate-200'
        : 'bg-white h-[85px] flex items-center border-b border-slate-100'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Left Brand Logo (Image Only) */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative w-28 h-28 sm:w-20 sm:h-20 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/logo.png"
                alt="Regisure India Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative py-1 ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-700 hover:text-emerald-600'
                    }`}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-400" />}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button (Emerald Green Phone Pill Button) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={formattedTel}
              aria-label={`Call us at ${phoneNumber}`}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all shadow-lg shadow-emerald-600/30 active:scale-95 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 text-white fill-current" />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={formattedTel}
              className="p-2 text-white bg-emerald-600 rounded-full shadow-sm"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5 text-white" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[80px] left-0 right-0 bg-white border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 animate-fade-in font-sans z-50">
          <nav className="flex flex-col gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
            <a
              href={formattedTel}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-emerald-600 rounded-full shadow-lg"
            >
              <Phone className="w-4 h-4 text-white" />
              Call Now: {phoneNumber}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenConsultation();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-brand-900 hover:bg-brand-950 rounded-full"
            >
              Consult Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
