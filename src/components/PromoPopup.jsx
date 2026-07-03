"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Truck, Headphones, Phone, Globe, ChevronRight } from 'lucide-react';

const PromoPopup = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup in this session
    const hasSeen = localStorage.getItem('hasSeenPromoPopup');
    if (!hasSeen && settings && settings.isActive) {
      // Small timeout to let the page load smoothly before popping up
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [settings]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPromoPopup', 'true');
  };

  if (!settings || !settings.isActive) return null;

  // Helper to map feature text or index to Lucide icons
  const getFeatureIcon = (index, text) => {
    const lowerText = (text || '').toLowerCase();
    if (lowerText.includes('rent') || lowerText.includes('calendar') || index === 0) {
      return <Calendar className="w-5 h-5 text-gray-700 shrink-0" />;
    }
    if (lowerText.includes('deliver') || lowerText.includes('truck') || index === 1) {
      return <Truck className="w-5 h-5 text-gray-700 shrink-0" />;
    }
    return <Headphones className="w-5 h-5 text-gray-700 shrink-0" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative bg-white text-black w-full max-w-xl md:max-w-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl z-10 border border-white/10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white rounded-full p-2 transition-colors duration-200"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Content Column */}
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between space-y-6 md:max-w-[55%]">
              
              {/* Header Logo */}
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tighter uppercase text-black">
                  MAYOORA <span className="text-[#600138] font-extrabold">CINE</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-black text-gray-500 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#600138] animate-pulse"></span>
                  <span>NEW INVENTORY</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-black leading-tight tracking-tight uppercase">
                  {settings.title}
                </h3>
                <h4 className="text-3xl md:text-4xl font-extrabold text-black tracking-tighter uppercase leading-none">
                  {settings.subtitle}
                </h4>
                <div className="w-12 h-1 bg-[#600138] mt-3 rounded-full" />
                <p className="text-gray-500 text-xs md:text-sm font-semibold italic pt-2 uppercase tracking-wide">
                  {settings.tagline}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 my-2">
                {settings.features && settings.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      {getFeatureIcon(idx, feature)}
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button & Link */}
              <div className="space-y-4 pt-2">
                <a
                  href={settings.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full border-2 border-[#600138] hover:bg-[#600138] hover:text-white text-[#600138] py-3.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>{settings.buttonText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                {/* Footer URL */}
                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 text-gray-300" />
                  <span>{settings.website}</span>
                </div>
              </div>

            </div>

            {/* Right Graphic/Image Column */}
            <div className="flex-1 bg-gray-50 flex items-center justify-center p-6 md:p-8 md:max-w-[45%] relative border-t md:border-t-0 md:border-l border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50/80 via-transparent to-transparent z-10 pointer-events-none md:hidden" />
              <img
                src={settings.image}
                alt={settings.title}
                className="max-h-[220px] md:max-h-[360px] w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl relative z-0"
              />
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
