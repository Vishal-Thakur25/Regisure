'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Globe, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { BusinessSettings } from '@/lib/settings';

interface FooterProps {
  settings: BusinessSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const rawPhone = settings?.phone_number || '+91 98765 43210';
  const formattedTel = `tel:${rawPhone.replace(/[^0-9+]/g, '')}`;
  const address = settings?.address || 'Plot 45, Cyber City, Tower B, Gurugram, Delhi NCR, India';
  const email = settings?.email || 'contact@regisureindia.com';
  const businessName = settings?.business_name || 'Regisure India Solutions';

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#061F3D] text-slate-300 pt-16 pb-8 border-t border-[#092A52] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#092A52]">
          {/* Column 1 — Company Logo Only (Prominent & Highly Visible) */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-1 border-2 border-emerald-500 shadow-xl group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/images/logo.png"
                  alt={`${businessName} Logo`}
                  fill
                  className="object-contain p-0.5 rounded-full"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-xs font-normal leading-relaxed">
              We provide all types of CA services to help individuals and businesses stay compliant and grow better.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings?.facebook_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#092A52] hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings?.twitter_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#092A52] hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings?.linkedin_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#092A52] hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings?.instagram_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#092A52] hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-emerald-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — OUR SERVICES */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              OUR SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-normal">
              <li>NGO Registration</li>
              <li>Pvt Ltd Company Registration</li>
              <li>LLP & OPC Registration</li>
              <li>GST Registration & Filing</li>
              <li>ITR & Annual Compliances</li>
            </ul>
          </div>

          {/* Column 4 — CONTACT US (Dynamic Admin Settings) */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              CONTACT US
            </h4>
            <ul className="space-y-3 text-xs text-slate-400 font-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={formattedTel} className="hover:text-white transition-colors font-semibold text-white">
                  {rawPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>www.regisureindia.com</span>
              </li>
            </ul>
          </div>

          {/* Column 5 — NEWSLETTER */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              NEWSLETTER
            </h4>
            <p className="text-slate-400 text-xs font-normal leading-relaxed mb-3">
              Subscribe to get latest updates and tax tips.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-semibold">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white text-slate-900 rounded-l-xl text-xs font-normal focus:outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-xl transition-colors shrink-0 font-semibold"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-4 h-4 fill-current" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-normal gap-4">
          <p>© {new Date().getFullYear()} {businessName}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
