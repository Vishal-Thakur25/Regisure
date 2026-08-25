import React from 'react';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/pages';
import { PageEditorClient } from '@/components/admin/PageEditorClient';

interface AdminPageEditProps {
  params: {
    slug: string;
  };
}

export default async function AdminPageEdit({ params }: AdminPageEditProps) {
  const allowedSlugs = ['about', 'privacy-policy', 'terms-and-conditions'];
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const page = await getPageBySlug(params.slug);

  return (
    <div className="py-4">
      <PageEditorClient initialPage={page} />
    </div>
  );
}
