'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    honeypot: '' // spam protection trap
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry. Please try again.');
      }

      setStatus('success');
      setFeedbackMessage(data.message || 'Your inquiry has been successfully transmitted.');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        honeypot: ''
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transmission failed';
      setStatus('error');
      setFeedbackMessage(msg);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#08090A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>Direct Transmission</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Initiate Dialogue With Nexora Group.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Whether exploring venture collaborations, technical partnerships, or digital innovation inquiries with any of our four member companies, our central leadership team reviews all incoming transmissions.
            </p>

            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0E1117] border border-white/10">
                <Mail className="w-5 h-5 text-zinc-300 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Central Communications
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">contact@nexoragroup.com</p>
                  <p className="text-[11px] text-zinc-500 mt-1">Average response within 1 business day</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0E1117] border border-white/10">
                <MessageSquare className="w-5 h-5 text-zinc-300 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Venture Inquiries
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Engineering, Digital Studios, Brand Ventures, and Emerging Tech.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0E1117] border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from screen, filled by spam bots) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact_name" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact_name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact_email" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                      Corporate Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact_email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div>
                    <label htmlFor="contact_company" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                      Organization / Entity
                    </label>
                    <input
                      id="contact_company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact_subject" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact_subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Venture Partnership Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact_message" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                    Message Specification <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact_message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or partnership objectives..."
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Status Feedback Banners */}
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-emerald-300">Transmission Delivered</p>
                      <p className="text-xs text-emerald-400/80 mt-0.5">{feedbackMessage}</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-red-300">Transmission Error</p>
                      <p className="text-xs text-red-400/80 mt-0.5">{feedbackMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group shadow-lg shadow-white/5"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
