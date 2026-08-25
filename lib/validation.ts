import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const LeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits').max(20),
  service: z.string().min(1, 'Please select or specify a service'),
  message: z.string().min(5, 'Message must be at least 5 characters long').max(2000),
  honeypot: z.string().optional(), // Anti-spam bot field
});

export const ServiceSchema = z.object({
  name: z.string().min(3, 'Service name must be at least 3 characters long'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters long').max(300),
  description: z.string().min(20, 'Full description must be at least 20 characters long'),
  image: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
  icon: z.string().optional(),
  benefits: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  process: z.array(z.string()).default([]),
  price: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('PUBLISHED'),
  sortOrder: z.number().int().default(0),
});

export const SettingsSchema = z.object({
  business_name: z.string().min(2),
  phone_number: z.string().min(8),
  email: z.string().email(),
  address: z.string().min(5),
  working_hours: z.string().min(3),
  hero_title: z.string().min(5),
  hero_subtitle: z.string().min(10),
  facebook_url: z.string().url().optional().or(z.literal('')),
  twitter_url: z.string().url().optional().or(z.literal('')),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  instagram_url: z.string().url().optional().or(z.literal('')),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type LeadInput = z.infer<typeof LeadSchema>;
export type ServiceInput = z.infer<typeof ServiceSchema>;
export type SettingsInput = z.infer<typeof SettingsSchema>;
