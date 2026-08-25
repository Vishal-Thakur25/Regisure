import React from 'react';
import { prisma } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { LeadsTableClient } from '@/components/admin/LeadsTableClient';

export default async function AdminLeadsPage() {
  let leads: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    status: string;
    notes?: string | null;
    createdAt: string;
  }> = [];

  try {
    const leadsRaw = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    leads = leadsRaw.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      phone: l.phone,
      service: l.service,
      message: l.message,
      status: l.status,
      notes: l.notes,
      createdAt: l.createdAt.toISOString(),
    }));
  } catch {
    leads = [];
  }

  return (
    <div>
      <AdminHeader
        title="Lead & Consultation Management"
        subtitle="Track incoming client consultation requests, update lead pipeline status, and add internal notes."
      />
      <div className="p-6 max-w-7xl mx-auto">
        <LeadsTableClient leads={leads} />
      </div>
    </div>
  );
}
