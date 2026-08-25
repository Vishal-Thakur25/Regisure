import React from 'react';
import { prisma } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ServicesTableClient } from '@/components/admin/ServicesTableClient';

export default async function AdminServicesPage() {
  let services: Array<{
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    image?: string | null;
    status: string;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
  }> = [];

  try {
    const servicesRaw = await prisma.service.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    services = servicesRaw.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      shortDescription: s.shortDescription,
      image: s.image,
      status: s.status,
      sortOrder: s.sortOrder,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }));
  } catch {
    services = [];
  }

  return (
    <div>
      <AdminHeader
        title="Service Management"
        subtitle="Create, edit, publish, draft, or delete corporate service listings."
      />
      <div className="p-6 max-w-7xl mx-auto">
        <ServicesTableClient services={services} />
      </div>
    </div>
  );
}
