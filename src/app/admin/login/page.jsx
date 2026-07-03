// src/app/admin/login/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/utils/api';
import { ShieldAlert, Film, KeyRound, User, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (api.auth.checkAuth()) {
      api.auth.verify()
        .then(() => {
          router.push('/admin/dashboard');
        })
        .catch(() => {
          api.auth.logout();
        });
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.auth.login(username, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'INVALID USERNAME OR PASSWORD. PLEASE TRY AGAIN.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d090b] relative overflow-hidden px-6">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#600138]/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E2D1A1]/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#600138]/20 border border-[#600138]/30 rounded-3xl shadow-inner text-[#E2D1A1] mb-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#600138]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <Film className="w-10 h-10 relative z-10 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider italic">
            MAYOORA <span className="text-[#E2D1A1] font-light font-sans">CONTROL PANEL</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Secure Administration Console</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#140e11]/85 border border-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-8 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#600138] to-transparent"></div>

          {error && (
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center space-x-3 text-red-400 font-bold text-xs uppercase tracking-wider animate-bounce">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Enter admin username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1c1417] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-[#600138] focus:ring-1 focus:ring-[#600138] transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="Enter secure password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1c1417] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-[#600138] focus:ring-1 focus:ring-[#600138] transition-all text-sm"
                />
              </div>
            </div>



            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-[#600138] to-[#80024a] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>CONNECTING...</span>
                </div>
              ) : (
                <span>SECURE LOGIN</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link 
                href="/" 
                className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-[#E2D1A1] uppercase tracking-widest transition-colors space-x-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Main Site</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
