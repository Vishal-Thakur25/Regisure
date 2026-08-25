'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createLeadAction } from '@/actions/lead-actions';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface ContactFormProps {
  servicesList?: string[];
}

export const ContactForm: React.FC<ContactFormProps> = ({
  servicesList = [
    'Private Limited Company Registration',
    'GST Registration & Return Filing',
    'Trademark & Brand Registration',
    'ISO 9001:2015 Certification',
    'FSSAI Food License & Registration',
    'Annual Corporate ROC & Secretarial Compliance',
    'General Inquiry / Legal Advice',
  ],
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('General Inquiry / Legal Advice');
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
      setSuccessMsg(res.message || 'Your message has been sent successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      setErrorMsg(res.error || 'Failed to submit form. Please check your inputs.');
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl relative overflow-hidden font-sans">
      {successMsg ? (
        <div className="py-12 text-center animate-fade-in">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed mb-6 font-normal">{successMsg}</p>
          <Button variant="outline" size="md" onClick={() => setSuccessMsg(null)}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Send Us a Direct Message</h3>
          <p className="text-slate-500 text-sm font-normal">Fill out the form below and our response team will get back to you within 2 business hours.</p>

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Anti-spam honeypot */}
          <div className="hidden">
            <input
              type="text"
              name="b_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Roy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                placeholder="ananya@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject / Service *</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors"
              >
                {servicesList.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Message *</label>
            <textarea
              rows={4}
              required
              placeholder="Describe your inquiry or statutory requirement..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <Button variant="primary" size="lg" isLoading={isLoading} className="w-full gap-2 font-semibold bg-brand-900 hover:bg-brand-950">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Send Message</span>
          </Button>
        </form>
      )}
    </div>
  );
};
