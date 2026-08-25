import React from 'react';
import { getBusinessSettings } from '@/lib/settings';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SettingsFormClient } from '@/components/admin/SettingsFormClient';

export default async function AdminSettingsPage() {
  const settings = await getBusinessSettings();

  return (
    <div>
      <AdminHeader
        title="Website Settings & Business Details"
        subtitle="Update site-wide phone numbers, business address, hero headlines, and social links."
      />
      <div className="p-6">
        <SettingsFormClient initialSettings={settings} />
      </div>
    </div>
  );
}
