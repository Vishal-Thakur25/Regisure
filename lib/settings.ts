import { prisma } from './db';

export interface BusinessSettings {
  business_name: string;
  phone_number: string;
  email: string;
  address: string;
  working_hours: string;
  hero_title: string;
  hero_subtitle: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
}

export const DEFAULT_SETTINGS: BusinessSettings = {
  business_name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Regisure India Solutions',
  phone_number: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210',
  email: process.env.NEXT_PUBLIC_EMAIL || 'contact@regisureindia.com',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Plot 45, Cyber City, Tower B, Gurugram, Delhi NCR, India',
  working_hours: 'Monday - Saturday: 9:00 AM - 7:00 PM IST',
  hero_title: 'Professional Compliance & Business Registration Solutions designed to help your company scale effortlessly.',
  hero_subtitle: 'From GST Registration and Trademark Licensing to Corporate Tax & Annual Compliance, our certified experts handle everything while you focus on growth.',
  facebook_url: 'https://facebook.com',
  twitter_url: 'https://twitter.com',
  linkedin_url: 'https://linkedin.com',
  instagram_url: 'https://instagram.com',
};

export async function getBusinessSettings(): Promise<BusinessSettings> {
  try {
    const settingsList = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};

    for (const item of settingsList) {
      settingsMap[item.key] = item.value;
    }

    return {
      business_name: settingsMap.business_name || DEFAULT_SETTINGS.business_name,
      phone_number: settingsMap.phone_number || DEFAULT_SETTINGS.phone_number,
      email: settingsMap.email || DEFAULT_SETTINGS.email,
      address: settingsMap.address || DEFAULT_SETTINGS.address,
      working_hours: settingsMap.working_hours || DEFAULT_SETTINGS.working_hours,
      hero_title: settingsMap.hero_title || DEFAULT_SETTINGS.hero_title,
      hero_subtitle: settingsMap.hero_subtitle || DEFAULT_SETTINGS.hero_subtitle,
      facebook_url: settingsMap.facebook_url || DEFAULT_SETTINGS.facebook_url,
      twitter_url: settingsMap.twitter_url || DEFAULT_SETTINGS.twitter_url,
      linkedin_url: settingsMap.linkedin_url || DEFAULT_SETTINGS.linkedin_url,
      instagram_url: settingsMap.instagram_url || DEFAULT_SETTINGS.instagram_url,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
