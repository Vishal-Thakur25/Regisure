'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { SettingsSchema, SettingsInput } from '@/lib/validation';
import { getAdminSession } from '@/lib/auth';

export async function updateSettingsAction(data: SettingsInput) {
  try {
    const session = await getAdminSession();
    if (!session) throw new Error('Unauthorized');

    const validated = SettingsSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const settingsMap = validated.data;

    for (const [key, value] of Object.entries(settingsMap)) {
      if (value !== undefined) {
        await prisma.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value), group: 'general' },
        });
      }
    }

    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');

    return { success: true, message: 'Website settings updated successfully' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update settings';
    return { success: false, error: message };
  }
}
