import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ServiceForm } from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <AdminHeader
        title="Create New Service"
        subtitle="Add a new corporate or legal service to the public database catalog."
      />
      <div className="p-6">
        <ServiceForm />
      </div>
    </div>
  );
}
