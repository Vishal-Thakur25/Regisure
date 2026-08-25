import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ServiceForm } from '@/components/admin/ServiceForm';

interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });

  if (!service) {
    notFound();
  }

  return (
    <div>
      <AdminHeader
        title={`Edit Service: ${service.name}`}
        subtitle="Update service content, package deliverables, or SEO parameters."
      />
      <div className="p-6">
        <ServiceForm initialData={service} />
      </div>
    </div>
  );
}
