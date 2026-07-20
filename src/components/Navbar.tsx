"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Key, LogOut, Compass, Sparkles, User, Settings, PlusCircle, LayoutDashboard, Info, Mail } from 'lucide-react';
import clsx from 'clsx';

export const Navbar: React.FC = () => {
  const { user, logout, geminiApiKey, setApiKey } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(geminiApiKey);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    router.push('/');
  };

  const activeClassName = "text-teal-400 font-semibold flex items-center gap-1.5 py-2 px-3 border-b-2 border-teal-500";
  const inactiveClassName = "text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all duration-200 flex items-center gap-1.5 py-2 px-3 rounded-lg";

  const mobileActiveClassName = 'bg-slate-900 text-teal-400 block px-3 py-2 rounded-md font-medium flex items-center gap-2.5';
  const mobileInactiveClassName = 'text-slate-300 hover:bg-slate-900/60 block px-3 py-2 rounded-md font-medium flex items-center gap-2.5';

  const publicLinks = [
    { to: '/', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { to: '/explore', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
    { to: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { to: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const protectedLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/items/add', label: 'Add Item', icon: <PlusCircle className="w-4 h-4" /> },
    { to: '/items/manage', label: 'Manage', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-teal-400 bg-clip-text text-transparent tracking-tight">
                    TravelGenie
                  </span>
                  <span className="text-[10px] font-bold text-indigo-400 block tracking-widest leading-3 -mt-0.5">AI PLANNER</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1.5">
              {publicLinks.map(link => (
                <Link
                  key={link.to}
                  href={link.to}
                  className={clsx(pathname === link.to ? activeClassName : inactiveClassName)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              {user && protectedLinks.map(link => (
                <Link
                  key={link.to}
                  href={link.to}
                  className={clsx(pathname === link.to ? activeClassName : inactiveClassName)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right-side Auth Controls */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => { setTempKey(geminiApiKey); setShowKeyModal(true); }}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  geminiApiKey
                    ? 'border-teal-500/30 bg-teal-500/5 text-teal-400 hover:bg-teal-500/10'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Configure Gemini API Key"
              >
                <Key className="w-5 h-5" />
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 p-1.5 rounded-full border border-slate-800 bg-slate-900 hover:border-slate-700 transition-colors"
                  >
                    <img
                      src={user.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                      alt={user.name}
                      className="w-7 h-7 rounded-full bg-slate-800 object-cover"
                    />
                    <span className="text-sm font-medium text-slate-300 max-w-[120px] truncate pr-2">
                      {user.name}
                    </span>
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2.5 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1.5 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-xs text-slate-500">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        My Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:brightness-105 active:scale-95 shadow-md shadow-teal-500/10 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2.5">
              <button
                onClick={() => { setTempKey(geminiApiKey); setShowKeyModal(true); }}
                className={`p-1.5 rounded-lg border ${
                  geminiApiKey ? 'border-teal-500/30 text-teal-400' : 'border-slate-800 text-slate-400'
                }`}
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-slate-950 border-t border-slate-900 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-300">
            {publicLinks.map(link => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setIsOpen(false)}
                className={pathname === link.to ? mobileActiveClassName : mobileInactiveClassName}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {user && protectedLinks.map(link => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setIsOpen(false)}
                className={pathname === link.to ? mobileActiveClassName : mobileInactiveClassName}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <img
                      src={user.image}
                      alt=""
                      className="w-9 h-9 rounded-full bg-slate-800 object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full block text-center px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Key Setup Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-2xl animate-in scale-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-teal-400" />
                Gemini API Key Settings
              </h3>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              To activate premium AI Trip Generation and context-aware chat, please provide a Google Gemini API Key. If left empty, the application will use the local mock AI engine.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors text-sm"
                >
                  Save Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};