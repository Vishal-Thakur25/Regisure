'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { updateLeadStatusAction, deleteLeadAction } from '@/actions/lead-actions';
import { Search, SlidersHorizontal, Trash2, Mail, Phone, Calendar, Eye, AlertTriangle, FileText } from 'lucide-react';

export interface AdminLeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  notes?: string | null;
  createdAt: string;
}

interface LeadsTableClientProps {
  leads: AdminLeadRow[];
}

export const LeadsTableClient: React.FC<LeadsTableClientProps> = ({ leads }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [selectedLead, setSelectedLead] = useState<AdminLeadRow | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [leadNotes, setLeadNotes] = useState('');

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    await updateLeadStatusAction(leadId, newStatus);
    setUpdatingId(null);
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setUpdatingId(selectedLead.id);
    await updateLeadStatusAction(selectedLead.id, selectedLead.status, leadNotes);
    setUpdatingId(null);
    setSelectedLead(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteLeadAction(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
  };

  const formattedTel = (phoneNum: string) => `tel:${phoneNum.replace(/[^0-9+]/g, '')}`;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="danger">NEW</Badge>;
      case 'CONTACTED':
        return <Badge variant="warning">CONTACTED</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="info">IN PROGRESS</Badge>;
      case 'CONVERTED':
        return <Badge variant="success">CONVERTED</Badge>;
      case 'CLOSED':
        return <Badge variant="slate">CLOSED</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Status Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by client name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="ALL">All Lead Statuses</option>
            <option value="NEW">NEW Only</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="CONVERTED">CONVERTED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Client Name</th>
                  <th className="px-6 py-3.5">Contact Details</th>
                  <th className="px-6 py-3.5">Service Requested</th>
                  <th className="px-6 py-3.5">Lead Status</th>
                  <th className="px-6 py-3.5">Submitted Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{lead.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-0.5">
                        <a
                          href={formattedTel(lead.phone)}
                          className="font-semibold text-brand-600 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </a>
                        <p className="text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{lead.email}</span>
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-800">{lead.service}</td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="NEW">🔴 NEW</option>
                        <option value="CONTACTED">🟡 CONTACTED</option>
                        <option value="IN_PROGRESS">🔵 IN PROGRESS</option>
                        <option value="CONVERTED">🟢 CONVERTED</option>
                        <option value="CLOSED">⚪ CLOSED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setLeadNotes(lead.notes || '');
                          }}
                          className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="View Lead Message & Add Notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(lead.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Lead Record"
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
            No leads found matching current filter.
          </div>
        )}
      </div>

      {/* View Lead Drawer / Modal */}
      <Modal isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} maxWidth="lg">
        {selectedLead && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedLead.name}</h3>
                <p className="text-xs text-slate-500">{selectedLead.service}</p>
              </div>
              <div>{getStatusBadge(selectedLead.status)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div>
                <p className="font-semibold text-slate-500">Phone</p>
                <a href={formattedTel(selectedLead.phone)} className="font-bold text-brand-600">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <p className="font-semibold text-slate-500">Email</p>
                <a href={`mailto:${selectedLead.email}`} className="font-bold text-brand-600">
                  {selectedLead.email}
                </a>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Client Inquiry Message
              </label>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {selectedLead.message}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Internal Admin Notes
              </label>
              <textarea
                rows={3}
                value={leadNotes}
                onChange={(e) => setLeadNotes(e.target.value)}
                placeholder="Add internal notes about CA call outcomes, required documents, or payment status..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setSelectedLead(null)}>
                Close
              </Button>
              <Button variant="primary" size="md" onClick={handleSaveNotes}>
                Save Notes
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Lead Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="md">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Delete Lead Record</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to delete this lead? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="md" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="md" isLoading={isDeleting} onClick={handleDeleteConfirm}>
              Delete Lead
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
