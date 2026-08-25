'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { createLeadAction } from '@/actions/lead-actions';
import { CheckCircle2, AlertCircle, PhoneCall, Calendar } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  servicesList?: string[];
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'General Corporate Consultation',
  servicesList = [
    'NGO Registration',
    'Private Limited Company',
    'LLP Registration',
    'OPC Registration',
    'Annual Compliances',
    'GST Registration & Filing',
    'ITR Filing',
    '12A & 80G Registration',
    'NITI Aayog Darpan Registration',
    'CSR Registration (Form CSR-1)',
    'E-Anudaan Registration',
    'FSSAI Food License',
    'Trademark Registration',
    'ISO Certification',
    'Import Export Code (IEC)',
    'Audit Report',
    'General Corporate Consultation',
  ],
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await createLeadAction({
      name,
      email,
      phone,
      service,
      message,
      honeypot,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(res.message || 'Consultation request submitted successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      setErrorMsg(res.error || 'Failed to submit form. Please check your inputs.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="text-left font-sans">
        {/* Header Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Book Free CA Consultation</h3>
            <p className="text-xs text-slate-500 font-normal">Speak directly with our senior legal & corporate experts</p>
          </div>
        </div>

        {successMsg ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center my-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-emerald-900 mb-1">Request Received!</h4>
            <p className="text-sm text-emerald-700 leading-relaxed mb-6 font-normal">{successMsg}</p>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setSuccessMsg(null);
                onClose();
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Anti-spam honeypot (Hidden) */}
            <div className="hidden">
              <input
                type="text"
                name="b_website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interested Service *</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {servicesList.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Requirements / Message *</label>
              <textarea
                rows={3}
                required
                placeholder="Tell us about your business goals or compliance needs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="pt-2">
              <Button variant="primary" size="lg" isLoading={isLoading} className="w-full gap-2 font-semibold bg-brand-900 hover:bg-brand-950">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Submit Consultation Request</span>
              </Button>
            </div>

            <p className="text-[11px] text-slate-400 text-center font-normal">
              🔒 Your privacy is 100% guaranteed. No spam policy.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};
