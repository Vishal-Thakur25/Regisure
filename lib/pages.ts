import { prisma } from './db';

export interface PageSectionItem {
  heading?: string;
  text?: string;
  title?: string;
  desc?: string;
}

export interface AboutSections {
  mission?: { title: string; desc: string };
  vision?: { title: string; desc: string };
  values?: Array<{ title: string; desc: string }>;
}

export interface PageData {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  sections: string; // JSON string representation
  seoTitle: string;
  seoDescription: string;
  updatedAt?: Date | string;
}

export const DEFAULT_PAGES: Record<string, PageData> = {
  about: {
    slug: 'about',
    title: 'Empowering Indian Enterprises to Scale Seamlessly',
    subtitle: 'Pioneering Corporate Excellence',
    content:
      'Regisure India was founded with a singular vision: to liberate entrepreneurs from tedious government bureaucracy and statutory legal friction through technology, transparency, and top-tier chartered accountancy.',
    sections: JSON.stringify({
      mission: {
        title: 'Our Mission',
        desc: 'To deliver 100% digital, fast, and bulletproof legal incorporation, GST, trademark, and tax secretarial compliance to every growing business in India with total cost transparency.',
      },
      vision: {
        title: 'Our Vision',
        desc: 'To become the single most trusted statutory partner and compliance operating system for over 100,000 corporate enterprises across India by 2030.',
      },
      values: [
        { title: 'Absolute Integrity', desc: 'No hidden government fees or surprise upsells. Complete upfront pricing transparency.' },
        { title: 'Statutory Rigor', desc: 'Every application is thoroughly audited by certified CAs and advocates before submission.' },
        { title: 'Speed & Execution', desc: 'Rapid SLA turnarounds with automated MCA, GST, and IP portal tracking updates.' },
        { title: 'Client Confidentiality', desc: 'Bank-grade encryption protecting your personal financial identity documents.' },
        { title: 'Proactive Advisory', desc: 'We notify you well before compliance due dates so you never incur ROC penalties.' },
        { title: 'Lifelong Partnership', desc: 'From day 1 incorporation to series funding statutory audits, we stand by your company.' },
      ],
    }),
    seoTitle: 'About Us | Regisure India Solutions',
    seoDescription: 'Learn more about Regisure India, our mission, vision, core legal values, and certified chartered accountant leadership.',
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'Last Updated: January 2026',
    content:
      'At Regisure India, we take your data privacy seriously. When you use our consultation forms, contact forms, or legal services, we collect personal details necessary for MCA, GST, and statutory filings.',
    sections: JSON.stringify([
      {
        heading: '1. Information We Collect',
        text: 'At Regisure India, we take your data privacy seriously. When you use our consultation forms, contact forms, or legal services, we collect personal details including your full name, phone number, email address, corporate identity documents, and business details necessary for MCA, GST, and statutory filings.',
      },
      {
        heading: '2. How We Use Your Information',
        text: 'Your information is exclusively used to provide corporate incorporation, tax registration, intellectual property filing, and annual secretarial compliance services. We do not sell or trade your data to third-party advertisers under any circumstances.',
      },
      {
        heading: '3. Data Security & Storage',
        text: 'We implement industry-standard AES-256 SSL encryption and secure server access protocols. Access to identity documents (PAN, Aadhaar, Passport) is strictly restricted to certified CAs and legal associates managing your statutory filings.',
      },
      {
        heading: '4. Contacting Us',
        text: 'If you have any questions regarding this Privacy Policy, you may contact our Compliance Officer at contact@regisureindia.com or call us at +91 98765 43210.',
      },
    ]),
    seoTitle: 'Privacy Policy | Regisure India Solutions',
    seoDescription: 'Privacy Policy and data protection commitments of Regisure India Solutions.',
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    subtitle: 'Last Updated: January 2026',
    content:
      'By accessing our website or retaining Regisure India Solutions for incorporation, GST, trademark, or secretarial services, you agree to comply with and be bound by these terms and conditions.',
    sections: JSON.stringify([
      {
        heading: '1. Acceptance of Terms',
        text: 'By accessing our website or retaining Regisure India Solutions for incorporation, GST, trademark, or secretarial services, you agree to comply with and be bound by these terms and conditions.',
      },
      {
        heading: '2. Professional Consultancy Services',
        text: 'Regisure India Solutions acts as a professional legal and corporate advisory facilitator. Statutory approval timelines (MCA COI, GSTIN, FSSAI) are subject to government portal processing schedules and government officer verification.',
      },
      {
        heading: '3. Client Responsibilities',
        text: 'Clients are responsible for providing authentic, accurate, and un-tampered identity, address proof, and corporate documents. Regisure India Solutions is not liable for statutory rejections resulting from fraudulent or incorrect client submissions.',
      },
      {
        heading: '4. Governing Law',
        text: 'These terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of these services shall be subject to the exclusive jurisdiction of the courts in Delhi NCR, India.',
      },
    ]),
    seoTitle: 'Terms & Conditions | Regisure India Solutions',
    seoDescription: 'Terms and conditions governing the corporate consultancy services provided by Regisure India Solutions.',
  },
};

export async function getPageBySlug(slug: string): Promise<PageData> {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (page) {
      return {
        id: page.id,
        slug: page.slug,
        title: page.title || DEFAULT_PAGES[slug]?.title || 'Page Title',
        subtitle: page.subtitle || DEFAULT_PAGES[slug]?.subtitle || '',
        content: page.content || DEFAULT_PAGES[slug]?.content || '',
        sections: page.sections || DEFAULT_PAGES[slug]?.sections || '[]',
        seoTitle: page.seoTitle || DEFAULT_PAGES[slug]?.seoTitle || page.title,
        seoDescription: page.seoDescription || DEFAULT_PAGES[slug]?.seoDescription || '',
        updatedAt: page.updatedAt,
      };
    }
  } catch {
    // Return default page data if database read fails
  }

  return DEFAULT_PAGES[slug] || {
    slug,
    title: 'Page Title',
    subtitle: '',
    content: '',
    sections: '[]',
    seoTitle: 'Page',
    seoDescription: '',
  };
}

export async function getAllPages(): Promise<PageData[]> {
  const slugs = ['about', 'privacy-policy', 'terms-and-conditions'];
  const pages: PageData[] = [];

  for (const slug of slugs) {
    const pageData = await getPageBySlug(slug);
    pages.push(pageData);
  }

  return pages;
}
