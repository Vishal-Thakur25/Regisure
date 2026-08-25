'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { LeadSchema, LeadInput } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';
import { getAdminSession } from '@/lib/auth';

export async function createLeadAction(data: LeadInput) {
  try {
    // Check honeypot anti-spam
    if (data.honeypot && data.honeypot.trim() !== '') {
      // Quietly succeed for bot traps
      return { success: true, message: 'Thank you! We will get back to you shortly.' };
    }

    // Rate limiting by email
    const rateCheck = checkRateLimit(`lead_${data.email}`, 3, 5 * 60 * 1000);
    if (!rateCheck.success) {
      return {
        success: false,
        error: 'Too many submissions from this email. Please wait a few minutes before trying again.',
      };
    }

    const validated = LeadSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const val = validated.data;

    const lead = await prisma.lead.create({
      data: {
        name: val.name,
        email: val.email,
        phone: val.phone,
        service: val.service,
        message: val.message,
        status: 'NEW',
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Thank you! Your request has been received. Our expert consultant will contact you shortly.',
      leadId: lead.id,
    };
  } catch (err: unknown) {
    console.error('Create lead error:', err);
    return { success: false, error: 'Failed to submit consultation request. Please try again.' };
  }
}

export async function updateLeadStatusAction(id: string, status: string, notes?: string) {
  try {
    const session = await getAdminSession();
    if (!session) throw new Error('Unauthorized');

    const validStatuses = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'];
    if (!validStatuses.includes(status)) {
      return { success: false, error: 'Invalid lead status' };
    }

    await prisma.lead.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath('/admin');

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update lead';
    return { success: false, error: message };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    const session = await getAdminSession();
    if (!session) throw new Error('Unauthorized');

    await prisma.lead.delete({ where: { id } });

    revalidatePath('/admin/leads');
    revalidatePath('/admin');

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete lead';
    return { success: false, error: message };
  }
}
