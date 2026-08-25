'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageData } from '@/lib/pages';
import { updatePageAction } from '@/actions/page-actions';
import {
  Save,
  ArrowLeft,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface PageEditorClientProps {
  initialPage: PageData;
}

export const PageEditorClient: React.FC<PageEditorClientProps> = ({ initialPage }) => {
  const [formData, setFormData] = useState<PageData>(initialPage);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Parse sections based on page slug
  const isAboutPage = formData.slug === 'about';

  // State for About sections
  const [aboutMission, setAboutMission] = useState<{ title: string; desc: string }>(() => {
    if (isAboutPage && formData.sections) {
      try {
        const parsed = JSON.parse(formData.sections);
        if (parsed.mission) return parsed.mission;
      } catch {
        // Fallback
      }
    }
    return {
      title: 'Our Mission',
      desc: 'To deliver 100% digital, fast, and bulletproof legal incorporation, GST, trademark, and tax secretarial compliance.',
    };
  });

  const [aboutVision, setAboutVision] = useState<{ title: string; desc: string }>(() => {
    if (isAboutPage && formData.sections) {
      try {
        const parsed = JSON.parse(formData.sections);
        if (parsed.vision) return parsed.vision;
      } catch {
        // Fallback
      }
    }
    return {
      title: 'Our Vision',
      desc: 'To become the single most trusted statutory partner for over 100,000 corporate enterprises across India.',
    };
  });

  const [aboutValues, setAboutValues] = useState<Array<{ title: string; desc: string }>>(() => {
    if (isAboutPage && formData.sections) {
      try {
        const parsed = JSON.parse(formData.sections);
        if (Array.isArray(parsed.values)) return parsed.values;
      } catch {
        // Fallback
      }
    }
    return [
      { title: 'Absolute Integrity', desc: 'No hidden government fees or surprise upsells.' },
      { title: 'Statutory Rigor', desc: 'Audited by certified CAs and advocates before submission.' },
    ];
  });

  // State for Policy/Terms sections (array of heading & text)
  const [policySections, setPolicySections] = useState<Array<{ heading: string; text: string }>>(() => {
    if (!isAboutPage && formData.sections) {
      try {
        const parsed = JSON.parse(formData.sections);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Fallback
      }
    }
    return [
      { heading: '1. Information We Collect', text: 'Details of collected information...' },
    ];
  });

  const handleValueChange = (index: number, field: 'title' | 'desc', val: string) => {
    const updated = [...aboutValues];
    updated[index][field] = val;
    setAboutValues(updated);
  };

  const handleAddValue = () => {
    setAboutValues([...aboutValues, { title: 'New Core Value', desc: 'Description of value...' }]);
  };

  const handleRemoveValue = (index: number) => {
    setAboutValues(aboutValues.filter((_, i) => i !== index));
  };

  const handlePolicySectionChange = (index: number, field: 'heading' | 'text', val: string) => {
    const updated = [...policySections];
    updated[index][field] = val;
    setPolicySections(updated);
  };

  const handleAddPolicySection = () => {
    setPolicySections([
      ...policySections,
      { heading: `${policySections.length + 1}. New Clause Section`, text: 'Enter clause text...' },
    ]);
  };

  const handleRemovePolicySection = (index: number) => {
    setPolicySections(policySections.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Build sections JSON string
    let sectionsJson = '[]';
    if (isAboutPage) {
      sectionsJson = JSON.stringify({
        mission: aboutMission,
        vision: aboutVision,
        values: aboutValues,
      });
    } else {
      sectionsJson = JSON.stringify(policySections);
    }

    const payload = {
      ...formData,
      sections: sectionsJson,
    };

    const res = await updatePageAction(payload);
    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: res.message || 'Page updated successfully!' });
      setFormData(payload);
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to update page' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            title="Back to Pages list"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
              Editing Page: /{formData.slug}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">{formData.title}</h1>
          </div>
        </div>

        <Link
          href={`/${formData.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-emerald-600" />
          <span>View Live Page</span>
        </Link>
      </div>

      {/* Notification Toast Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Page Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Main Page Info & Headline</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Main Page Heading Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Badge / Subtitle Tagline
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Pioneering Corporate Excellence or Last Updated: January 2026"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Main Paragraph Description *
            </label>
            <textarea
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Structured Page Sections */}
        {isAboutPage ? (
          /* About Us Structured Sections */
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>Mission, Vision & Core Values</span>
            </h2>

            {/* Mission & Vision grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mission Title
                </label>
                <input
                  type="text"
                  value={aboutMission.title}
                  onChange={(e) => setAboutMission({ ...aboutMission, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pt-1">
                  Mission Description
                </label>
                <textarea
                  rows={3}
                  value={aboutMission.desc}
                  onChange={(e) => setAboutMission({ ...aboutMission, desc: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Vision Title
                </label>
                <input
                  type="text"
                  value={aboutVision.title}
                  onChange={(e) => setAboutVision({ ...aboutVision, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pt-1">
                  Vision Description
                </label>
                <textarea
                  rows={3}
                  value={aboutVision.desc}
                  onChange={(e) => setAboutVision({ ...aboutVision, desc: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                />
              </div>
            </div>

            {/* Core Values List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Core Values List ({aboutValues.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddValue}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Core Value</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aboutValues.map((val, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Value #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveValue(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Remove Value"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={val.title}
                      onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                      placeholder="Value Heading Title"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                    />

                    <textarea
                      rows={2}
                      value={val.desc}
                      onChange={(e) => handleValueChange(idx, 'desc', e.target.value)}
                      placeholder="Value Description..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Privacy Policy / Terms Dynamic Section Clauses */
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span>Policy Clauses & Content Sections</span>
              </h2>
              <button
                type="button"
                onClick={handleAddPolicySection}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section Clause</span>
              </button>
            </div>

            <div className="space-y-4">
              {policySections.map((sec, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Clause Section #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePolicySection(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1 flex items-center gap-1 text-xs font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Clause</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => handlePolicySectionChange(idx, 'heading', e.target.value)}
                      placeholder="e.g. 1. Information We Collect"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Section Body Content
                    </label>
                    <textarea
                      rows={3}
                      value={sec.text}
                      onChange={(e) => handlePolicySectionChange(idx, 'text', e.target.value)}
                      placeholder="Enter clause text details..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: SEO Meta Tags */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Search Engine Optimization (SEO) Tags
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/pages"
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving to Database...' : 'Save & Publish Page'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
