'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { ServiceSchema, ServiceInput } from '@/lib/validation';
import { getAdminSession } from '@/lib/auth';

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized access');
  }
  return session;
}

export async function createServiceAction(data: ServiceInput) {
  try {
    await requireAdmin();

    const validated = ServiceSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const val = validated.data;

    // Check slug uniqueness
    const existing = await prisma.service.findUnique({ where: { slug: val.slug } });
    if (existing) {
      return { success: false, error: `Service slug "${val.slug}" is already in use.` };
    }

    const service = await prisma.service.create({
      data: {
        name: val.name,
        slug: val.slug,
        shortDescription: val.shortDescription,
        description: val.description,
        image: val.image || null,
        icon: val.icon || 'Briefcase',
        benefits: JSON.stringify(val.benefits),
        features: JSON.stringify(val.features),
        process: JSON.stringify(val.process),
        price: val.price || null,
        seoTitle: val.seoTitle || val.name,
        seoDescription: val.seoDescription || val.shortDescription,
        status: val.status,
        sortOrder: val.sortOrder,
      },
    });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');

    return { success: true, serviceId: service.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create service';
    return { success: false, error: message };
  }
}

export async function updateServiceAction(id: string, data: ServiceInput) {
  try {
    await requireAdmin();

    const validated = ServiceSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const val = validated.data;

    // Check slug uniqueness for other services
    const existing = await prisma.service.findFirst({
      where: { slug: val.slug, NOT: { id } },
    });
    if (existing) {
      return { success: false, error: `Service slug "${val.slug}" is already used by another service.` };
    }

    await prisma.service.update({
      where: { id },
      data: {
        name: val.name,
        slug: val.slug,
        shortDescription: val.shortDescription,
        description: val.description,
        image: val.image || null,
        icon: val.icon || 'Briefcase',
        benefits: JSON.stringify(val.benefits),
        features: JSON.stringify(val.features),
        process: JSON.stringify(val.process),
        price: val.price || null,
        seoTitle: val.seoTitle || val.name,
        seoDescription: val.seoDescription || val.shortDescription,
        status: val.status,
        sortOrder: val.sortOrder,
      },
    });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath(`/services/${val.slug}`);
    revalidatePath('/admin/services');

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update service';
    return { success: false, error: message };
  }
}

export async function toggleServiceStatusAction(id: string) {
  try {
    await requireAdmin();

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      return { success: false, error: 'Service not found' };
    }

    const newStatus = service.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

    await prisma.service.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath(`/services/${service.slug}`);
    revalidatePath('/admin/services');

    return { success: true, newStatus };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to toggle service status';
    return { success: false, error: message };
  }
}

export async function deleteServiceAction(id: string) {
  try {
    await requireAdmin();

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      return { success: false, error: 'Service not found' };
    }

    await prisma.service.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete service';
    return { success: false, error: message };
  }
}
