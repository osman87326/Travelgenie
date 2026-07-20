import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { user, login, register, googleLogin, demoLogin } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error/validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  useEffect(() => {
    // If already logged in, redirect away
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!isLoginTab && !name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      if (isLoginTab) {
        const success = await login(email, password);
        if (!success) {
          setApiError('Invalid credentials. Try demo credentials instead!');
        }
      } else {
        const success = await register(name, email, password);
        if (!success) {
          setApiError('Registration failed. Try again.');
        }
      }
    } catch (err) {
      setApiError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAutofill = async () => {
    setLoading(true);
    await demoLogin();
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await googleLogin();
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#0b0f19]">
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="w-full max-w-md glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10">
        
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-teal-500/10 items-center justify-center text-teal-400 border border-teal-500/20 mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to TravelGenie</h2>
          <p className="text-xs text-slate-400">Your artificial intelligence journey starts here</p>
        </div>

        {/* Tabs switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900">
          <button
            onClick={() => { setIsLoginTab(true); setErrors({}); setApiError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              isLoginTab 
                ? 'bg-slate-900 text-teal-400 shadow' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setErrors({}); setApiError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isLoginTab 
                ? 'bg-slate-900 text-teal-400 shadow' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Register
          </button>
        </div>

        {apiError && (
          <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field (Register Only) */}
          {!isLoginTab && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all ${
                    errors.name ? 'border-rose-500/50' : ''
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all ${
                  errors.email ? 'border-rose-500/50' : ''
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all ${
                  errors.password ? 'border-rose-500/50' : ''
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-xs hover:brightness-105 active:scale-95 transition-all shadow-md shadow-teal-500/10 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLoginTab ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-[10px] text-slate-550 uppercase tracking-widest font-bold">Or Continue With</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* OAuth Buttons & Demo controls */}
        <div className="space-y-3">
          {/* Real Google Button Simulation */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-350 hover:text-white font-semibold text-xs active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Google Social Login
          </button>

          {/* Demo Login Button */}
          <button
            onClick={handleDemoAutofill}
            disabled={loading}
            className="w-full py-2.5 rounded-xl border border-dashed border-teal-500/30 bg-teal-500/5 hover:bg-teal-500/10 text-teal-400 font-semibold text-xs active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Demo Accounts (Auto-fill)
          </button>
        </div>

      </div>
    </div>
  );
};
