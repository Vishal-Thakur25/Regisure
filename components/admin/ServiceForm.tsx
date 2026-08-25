'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { createServiceAction, updateServiceAction } from '@/actions/service-actions';
import { ServiceInput } from '@/lib/validation';
import { Plus, Trash2, Wand2, AlertCircle, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ServiceFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    image?: string | null;
    icon?: string | null;
    benefits: string; // JSON string
    features: string; // JSON string
    process: string; // JSON string
    price?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    status: string;
    sortOrder: number;
  };
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditing = !!initialData;

  const parseJson = (jsonStr?: string) => {
    if (!jsonStr) return [];
    try {
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  };

  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [icon, setIcon] = useState(initialData?.icon || 'Building2');
  const [price, setPrice] = useState(initialData?.price || '');
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>(
    (initialData?.status as 'PUBLISHED' | 'DRAFT') || 'PUBLISHED'
  );
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 0);

  // Dynamic Item Arrays
  const [benefits, setBenefits] = useState<string[]>(
    parseJson(initialData?.benefits) || ['100% Digital MCA Processing', 'Includes DIN & DSC Certificates']
  );
  const [features, setFeatures] = useState<string[]>(
    parseJson(initialData?.features) || ['MOA & AOA Legal Drafting', 'PAN & TAN Issue Guarantee']
  );
  const [process, setProcess] = useState<string[]>(
    parseJson(initialData?.process) || [
      'Step 1: Document Upload & DSC Generation',
      'Step 2: Company Name Approval',
      'Step 3: SPICe+ MCA Portal Submission',
      'Step 4: Certificate of Incorporation Delivered',
    ]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to auto-generate slug
  const generateSlug = () => {
    const generated = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setSlug(generated);
  };

  // Array Handlers
  const handleAddArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, '']);
  };

  const handleUpdateArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    val: string
  ) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload: ServiceInput = {
      name,
      slug,
      shortDescription,
      description,
      image: image.trim() !== '' ? image : undefined,
      icon,
      benefits: benefits.filter((b) => b.trim() !== ''),
      features: features.filter((f) => f.trim() !== ''),
      process: process.filter((p) => p.trim() !== ''),
      price: price.trim() !== '' ? price : undefined,
      seoTitle: seoTitle.trim() !== '' ? seoTitle : name,
      seoDescription: seoDescription.trim() !== '' ? seoDescription : shortDescription,
      status,
      sortOrder: Number(sortOrder),
    };

    let res;
    if (isEditing && initialData) {
      res = await updateServiceAction(initialData.id, payload);
    } else {
      res = await createServiceAction(payload);
    }

    setIsLoading(false);

    if (res.success) {
      router.push('/admin/services');
      router.refresh();
    } else {
      setError(res.error || 'Failed to save service');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services List</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" type="button" onClick={() => router.push('/admin/services')}>
            Cancel
          </Button>
          <Button variant="amber" size="md" isLoading={isLoading} type="submit" className="gap-2 font-bold text-slate-950">
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Update Service' : 'Publish Service'}</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Info Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Basic Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Private Limited Company Registration"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">URL Slug *</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                placeholder="private-limited-company-registration"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center gap-1 shrink-0"
                title="Auto-generate slug from name"
              >
                <Wand2 className="w-4 h-4 text-brand-600" />
                <span>Generate</span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Short Summary Description *</label>
          <input
            type="text"
            required
            maxLength={300}
            placeholder="Brief 1-2 sentence overview for cards and listings..."
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Detailed Description *</label>
          <textarea
            rows={5}
            required
            placeholder="Full explanation of the service, legal scope, and MCA guidelines..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Featured Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Icon Identifier</label>
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Building2">Building (Company)</option>
              <option value="FileText">FileText (GST / Tax)</option>
              <option value="ShieldCheck">Shield (Trademark / IP)</option>
              <option value="Award">Award (ISO Quality)</option>
              <option value="Utensils">Utensils (FSSAI Food)</option>
              <option value="CheckCircle2">CheckCircle (Compliance)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Package Price (Optional)</label>
            <input
              type="text"
              placeholder="e.g. ₹6,999 (Govt Fees Extra)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'PUBLISHED' | 'DRAFT')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="PUBLISHED">PUBLISHED (Visible to Public)</option>
              <option value="DRAFT">DRAFT (Hidden from Public)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sort Priority Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Arrays Card: Benefits, Features, Process */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Package Details & Process Steps
        </h2>

        {/* Benefits Builder */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Business Benefits List
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setBenefits)}
              className="text-xs text-brand-600 font-semibold flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Benefit Point</span>
            </button>
          </div>
          {benefits.map((b, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={b}
                onChange={(e) => handleUpdateArrayItem(setBenefits, index, e.target.value)}
                placeholder="Benefit point..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(setBenefits, index)}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Features Checklist Builder */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Included Deliverables Checklist
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setFeatures)}
              className="text-xs text-brand-600 font-semibold flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Deliverable</span>
            </button>
          </div>
          {features.map((f, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={f}
                onChange={(e) => handleUpdateArrayItem(setFeatures, index, e.target.value)}
                placeholder="Included feature or document..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(setFeatures, index)}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Process Steps Builder */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Step-by-Step Workflow Steps
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setProcess)}
              className="text-xs text-brand-600 font-semibold flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Process Step</span>
            </button>
          </div>
          {process.map((p, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-6 text-center">{index + 1}.</span>
              <input
                type="text"
                value={p}
                onChange={(e) => handleUpdateArrayItem(setProcess, index, e.target.value)}
                placeholder="Workflow step description..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(setProcess, index)}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Information Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Search Engine Optimization (SEO Metadata)
        </h2>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">SEO Meta Title</label>
          <input
            type="text"
            placeholder="Custom SEO Title for Google Search..."
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">SEO Meta Description</label>
          <textarea
            rows={3}
            placeholder="Custom snippet description for search engine results..."
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>
    </form>
  );
};
