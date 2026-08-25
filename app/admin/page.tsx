import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Briefcase, CheckCircle2, FileEdit, Users, UserPlus, PlusCircle, Settings, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default async function AdminDashboardPage() {
  let totalServices = 0;
  let publishedServices = 0;
  let draftServices = 0;
  let totalLeads = 0;
  let newLeads = 0;
  let recentLeads: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    status: string;
    createdAt: Date;
  }> = [];

  try {
    const [tServ, pServ, dServ, tLeads, nLeads, rLeads] = await Promise.all([
      prisma.service.count(),
      prisma.service.count({ where: { status: 'PUBLISHED' } }),
      prisma.service.count({ where: { status: 'DRAFT' } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    totalServices = tServ;
    publishedServices = pServ;
    draftServices = dServ;
    totalLeads = tLeads;
    newLeads = nLeads;
    recentLeads = rLeads;
  } catch {
    // Graceful fallback during build-time without active DB connection
  }

  const statCards = [
    { title: 'Total Services', value: totalServices, icon: Briefcase, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { title: 'Published Services', value: publishedServices, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { title: 'Draft Services', value: draftServices, icon: FileEdit, color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { title: 'Total Leads', value: totalLeads, icon: Users, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { title: 'New Leads (Action Required)', value: newLeads, icon: UserPlus, color: 'bg-rose-50 text-rose-600 border-rose-200' },
  ];

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
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div>
      <AdminHeader
        title="Admin Overview Dashboard"
        subtitle="Manage services, review consultation leads, and update business configurations."
      />

      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">{card.title}</p>
                <p className="text-2xl font-extrabold text-slate-900">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl border ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-gradient-to-r from-slate-900 to-navy-900 text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Quick Admin Shortcuts</h3>
            <p className="text-xs text-slate-300">Create new service entries or update business contact details.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link href="/admin/services/new">
              <Button variant="amber" size="sm" className="gap-1.5 font-bold text-slate-950">
                <PlusCircle className="w-4 h-4" />
                <span>Add New Service</span>
              </Button>
            </Link>
            <Link href="/admin/leads">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Users className="w-4 h-4" />
                <span>Manage Leads ({newLeads} New)</span>
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" size="sm" className="gap-1.5 bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Leads Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">Recent Client Enquiries</h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Client Name</th>
                    <th className="px-6 py-3.5">Contact Info</th>
                    <th className="px-6 py-3.5">Service Requested</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{lead.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-xs">
                          <p className="font-medium text-slate-800">{lead.phone}</p>
                          <p className="text-slate-500">{lead.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-700">{lead.service}</td>
                      <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 text-sm">
              No leads submitted yet. Public form submissions will appear here automatically.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
