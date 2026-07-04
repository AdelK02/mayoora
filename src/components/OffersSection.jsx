"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const OffersSection = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Load dynamic offers from backend API
    api.offers.getAll()
      .then(setOffers)
      .catch(err => console.error("Error fetching banners:", err));
  }, []);

  if (!offers || offers.length === 0) return null;

  return (
    <section className="py-24 bg-[#140e12] px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#600138]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E2D1A1]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#600138]/20 border border-[#600138]/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#E2D1A1]">
              <Tag className="w-3.5 h-3.5" />
              <span>Exclusive Banners & Promotions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              Hot Offers & Posters
            </h2>
            <p className="text-gray-400 text-sm font-bold max-w-xl uppercase tracking-wider">
              Explore dynamic seasonal deals, package discounts, and special gear combinations designed to fit your production budget.
            </p>
          </div>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
            >
              <div 
                className="relative h-[300px] md:h-[350px] rounded-3xl overflow-hidden group border border-white/5 shadow-2xl hover:border-white/15 transition-all duration-500 bg-black/40"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 group-hover:scale-105"
                  style={{ backgroundImage: `url('${offer.image}')` }}
                />
                
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-[#600138]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Offer Text & Call to Action */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-none text-white drop-shadow-md">
                      {offer.title}
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm font-medium uppercase tracking-wider leading-relaxed line-clamp-2 drop-shadow-sm max-w-xl">
                      {offer.subtitle}
                    </p>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="pt-2">
                    <a 
                      href="https://wa.me/919496350343"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#600138] hover:bg-[#7A0247] text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl group/btn hover:-translate-y-0.5"
                    >
                      <span>CLAIM OFFER NOW</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default OffersSection;
