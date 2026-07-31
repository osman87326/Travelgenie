'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Kanban, Mail, Lock, User, PlusCircle } from 'lucide-react';
import Toast from '@/components/Toast';
import { signInWithGoogle } from '@/lib/auth-client';

export default function Register() {
  const { register, isAuthenticated, loadingUser, dbMode } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loadingUser, router]);

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrorMsg('Google sign-in could not be started. Please check your OAuth configuration.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Please populate all inputs.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const success = await register(name, email, password);
    setLoading(false);
    if (!success) {
      setErrorMsg('Registration failed. Email might already be registered.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.15),transparent_60%)]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="max-w-md w-full space-y-8 z-10">
        
        {/* Logo header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
              <Kanban className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Zen<span className="text-indigo-400">Board</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-100">Create your workspace profile</h2>
          <p className="mt-2 text-xs text-slate-400">
            Already have a profile?{' '}
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              sign in here
            </Link>
          </p>
        </div>

        {/* Card wrapper */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 shadow-2xl glass">
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs font-medium text-rose-300 text-center">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (min 6 chars)"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-1.5 h-11 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              {loading ? 'Registering...' : 'Register Profile'}
            </button>
          </form>

          <div className="mt-4">
            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.25em] text-slate-500">
                <span className="bg-slate-950/40 px-2">or continue with</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex justify-center items-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-900/60 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="#4285F4" d="M21.6 12.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.53Z" />
                <path fill="#34A853" d="M12 22c2.7 0 4.96-.89 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
                <path fill="#FBBC05" d="M6.41 13.92A6.01 6.01 0 0 1 6.41 10.08V7.5H3.07a10 10 0 0 0 0 12.84l3.34-2.42Z" />
                <path fill="#EA4335" d="M12 6.04c1.47 0 2.8.5 3.84 1.49l2.88-2.88A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.93 5.5l3.34 2.58C7.2 7.8 9.4 6.04 12 6.04Z" />
              </svg>
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </div>

        </div>

      </div>
      <Toast />
    </div>
  );
}
