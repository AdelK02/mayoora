"use client";

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingContact = () => {
  return (
    <>
      {/* Call Icon - Floating on the Right */}
      <div className="fixed right-6 bottom-10 z-[100]">
        <a 
          href="tel:+919496350343" 
          className="bg-[#989898] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group relative block"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#000000] px-3 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            Call Us
          </span>
        </a>
      </div>

      {/* WhatsApp Icon - Floating on the Left */}
      <div className="fixed left-6 bottom-10 z-[100]">
        <a 
          href="https://wa.me/919496350343" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group relative block"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white text-[#25D366] px-3 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </>
  );
};

export default FloatingContact;
