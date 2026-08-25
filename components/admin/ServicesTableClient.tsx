'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { toggleServiceStatusAction, deleteServiceAction } from '@/actions/service-actions';
import { Edit, Trash2, PlusCircle, ExternalLink, Search, AlertTriangle, Eye, EyeOff } from 'lucide-react';

export interface AdminServiceRow {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image?: string | null;
  status: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface ServicesTableClientProps {
  services: AdminServiceRow[];
}

export const ServicesTableClient: React.FC<ServicesTableClientProps> = ({ services }) => {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusTogglingId, setStatusTogglingId] = useState<string | null>(null);

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (id: string) => {
    setStatusTogglingId(id);
    await toggleServiceStatusAction(id);
    setStatusTogglingId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteServiceAction(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <Link href="/admin/services/new">
          <Button variant="amber" size="md" className="gap-2 font-bold text-slate-950 w-full sm:w-auto">
            <PlusCircle className="w-4 h-4" />
            <span>Create New Service</span>
          </Button>
        </Link>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Service</th>
                  <th className="px-6 py-3.5">Slug</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Order</th>
                  <th className="px-6 py-3.5">Created Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          {service.image ? (
                            <Image src={service.image} alt={service.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">
                              N/A
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{service.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">{service.shortDescription}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs font-mono text-slate-600">/{service.slug}</td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(service.id)}
                        disabled={statusTogglingId === service.id}
                        className="inline-flex items-center gap-1.5 focus:outline-none"
                        title="Click to toggle status"
                      >
                        {service.status === 'PUBLISHED' ? (
                          <Badge variant="success" className="cursor-pointer hover:opacity-80">
                            <Eye className="w-3 h-3 mr-1" />
                            PUBLISHED
                          </Badge>
                        ) : (
                          <Badge variant="warning" className="cursor-pointer hover:opacity-80">
                            <EyeOff className="w-3 h-3 mr-1" />
                            DRAFT
                          </Badge>
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-xs font-bold text-slate-700">{service.sortOrder}</td>

                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(service.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Preview Public Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setDeleteId(service.id);
                            setDeleteName(service.name);
                          }}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-sm">
            No services found matching search query.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="md">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Confirm Service Deletion</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to delete <span className="font-bold text-slate-800">"{deleteName}"</span>? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="md" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="md" isLoading={isDeleting} onClick={handleDeleteConfirm}>
              Delete Service
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
