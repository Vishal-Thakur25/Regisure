'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { PageSchema, PageInput } from '@/lib/validation';
import { getAdminSession } from '@/lib/auth';

export async function updatePageAction(data: PageInput) {
  try {
    const session = await getAdminSession();
    if (!session) throw new Error('Unauthorized');

    const validated = PageSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const { slug, title, subtitle, content, sections, seoTitle, seoDescription } = validated.data;

    await prisma.page.upsert({
      where: { slug },
      update: {
        title,
        subtitle: subtitle || '',
        content,
        sections: sections || '[]',
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || '',
      },
      create: {
        slug,
        title,
        subtitle: subtitle || '',
        content,
        sections: sections || '[]',
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || '',
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/admin/pages');
    revalidatePath(`/admin/pages/${slug}`);
    revalidatePath(`/${slug}`);

    return { success: true, message: `Page content for "${title}" updated successfully in database.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update page content';
    return { success: false, error: message };
  }
}
