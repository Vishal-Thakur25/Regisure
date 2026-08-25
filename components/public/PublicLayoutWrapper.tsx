'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ConsultationProvider } from './ConsultationContext';
import { BusinessSettings } from '@/lib/settings';

interface PublicLayoutWrapperProps {
  settings: BusinessSettings;
  children: React.ReactNode;
}

export const PublicLayoutWrapper: React.FC<PublicLayoutWrapperProps> = ({ settings, children }) => {
  return (
    <ConsultationProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-brand-500 selection:text-white">
        <Header phoneNumber={settings.phone_number} />

        {/* Main Page Content */}
        <main className="flex-grow">{children}</main>

        <Footer settings={settings} />
      </div>
    </ConsultationProvider>
  );
};
