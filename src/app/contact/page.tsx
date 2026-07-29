"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockApi } from '@/services/mockApi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters long';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    mockApi.saveContactMessage(formData);
    setLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Contact <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">Support</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Have questions about the AI planner, API configuration, or custom items? We are here to help.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Info Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">Contact Information</h3>

            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Our Office</p>
                  <p className="text-xs mt-0.5">123 Innovation Boulevard, Suite 500, Tech City, TC 94016</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Email Address</p>
                  <p className="text-xs mt-0.5">support@travelgenie.ai</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Phone Support</p>
                  <p className="text-xs mt-0.5">+1 (555) 893-2741</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-teal-950/20 to-slate-900/40">
            <h4 className="font-bold text-white text-sm mb-2">Technical Note</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Form submissions are saved to the local database in browser storage immediately and can be loaded dynamically.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Transmitted Successfully</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                  Your message has been stored in our system logs. Our support team will respond to your inquiry shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full glass-input ${errors.name ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={`w-full glass-input ${errors.email ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Itinerary customisation inquiry"
                    className={`w-full glass-input ${errors.subject ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                  />
                  {errors.subject && (
                    <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Message Body
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry in detail..."
                    className={`w-full glass-input resize-none ${errors.message ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-teal-500/10"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}