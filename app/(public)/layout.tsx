import React from 'react';
import { getBusinessSettings } from '@/lib/settings';
import { PublicLayoutWrapper } from '@/components/public/PublicLayoutWrapper';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getBusinessSettings();

  return <PublicLayoutWrapper settings={settings}>{children}</PublicLayoutWrapper>;
}
