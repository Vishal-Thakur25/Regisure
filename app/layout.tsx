import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Regisure India | Corporate Registration & GST Compliance',
  description:
    'Leading legal and chartered accountant corporate registration platform in India. Pvt Ltd, GST, Trademark, ISO, and Secretarial ROC Filings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased selection:bg-emerald-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
