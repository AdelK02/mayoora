"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, MessageCircle, Lock } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about' },
    {
      name: 'OUR PRODUCTS',
      href: '/products',
      dropdown: ['Cameras', 'Lights', 'Audio', 'Lenses', 'Grip-rigs']
    },
    { name: 'SERVICES', href: '/services' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      (isScrolled || isOpen)
        ? 'bg-[#140e12]/95 border-b border-neutral-900 shadow-2xl py-2' 
        : 'bg-transparent border-transparent py-2.5 lg:py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img
                src="/logo-dark-no-bg.png"
                alt="Mayoora Cine Rentals Logo"
                className="h-11 lg:h-16 w-auto rounded-lg"
              />
            </Link>
          </div>

          {/* Desktop Links (Centered Pill Container) */}
          <div className="hidden lg:flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 space-x-6 shadow-inner">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center text-white/80 hover:text-white hover:text-[#E2D1A1] font-semibold text-xs tracking-wider transition-colors"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="ml-1 w-4 h-4 text-[#E2D1A1]" />}
                </Link>

                {link.dropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 bg-[#140e12]/95 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-lg py-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item}
                        href={link.href === '/gallery' ? `/gallery?type=${item.toLowerCase()}` : `/products/${item.toLowerCase()}`}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info (WhatsApp) & Admin Demo */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="flex items-center bg-gradient-to-r from-[#600138] to-[#80024a] text-white px-4 py-3 rounded-lg hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-bold text-xs tracking-widest uppercase border  border-[#600138]/20"
            >
              <Lock className="w-5 h-5 mr-2 text-[#E2D1A1]" />
              <span className="text-white">Login</span>
            </Link>

            {/* <a 
              href="https://wa.me/919496350343"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] opacity-90 uppercase">Get in Touch</span>
                <span className="font-bold text-sm">9496 350 343</span>
              </div>
            </a> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#140e12]/95 border-t border-neutral-900 backdrop-blur-lg animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="block px-3 py-4 text-white hover:text-[#E2D1A1] font-bold text-base border-b border-neutral-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <div className="pt-4 flex flex-col space-y-4 px-3">
              <Link
                href="/admin/login"
                className="flex items-center justify-center bg-gradient-to-r from-[#600138] to-[#80024a] text-white py-3 rounded-lg hover:opacity-95 active:scale-[0.98] transition-all shadow-md font-bold text-xs tracking-widest uppercase text-center"
                onClick={() => setIsOpen(false)}
              >
                <Lock className="w-6 h-6 mr-2 text-[#E2D1A1]" />
                <span>Admin Portal</span>
              </Link>

              <a 
                href="https://wa.me/919496350343"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-500 font-bold justify-center pt-2 hover:opacity-80 transition-opacity"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                <span>9496 350 343</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
