"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SimpleProductCard = ({ title, image, price }) => {
  const encodedTitle = encodeURIComponent(title);
  const whatsappUrl = `https://wa.me/919496350343?text=Hi%20Mayoora%2C%20I%20am%20interested%20in%20renting%20the%20${encodedTitle}.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden group flex flex-col h-[420px] shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative w-full h-52 bg-gray-50 overflow-hidden flex items-center justify-center border-b border-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <h3 className="text-gray-900 text-lg font-black uppercase tracking-tight line-clamp-2 leading-tight">
            {title}
          </h3>
          {price && (
            <p className="text-[#600138] font-bold text-base">
              ₹ {price} <span className="text-xs text-gray-400 font-medium">/ Day</span>
            </p>
          )}
        </div>

        {/* WhatsApp Enquiry Button */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#600138] text-white py-3.5 rounded-2xl text-center text-xs font-black uppercase tracking-widest hover:bg-[#80024a] transition-all block mt-4"
        >
          Enquire Now
        </a>
      </div>
    </div>
    </motion.div>
  );
};

export default SimpleProductCard;
