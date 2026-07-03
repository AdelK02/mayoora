"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';

const DEFAULT_FALLBACK_CATEGORIES = [
  { name: 'CAMERAS', slug: 'cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
  { name: 'LENSES', slug: 'lenses', image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80' },
  { name: 'MONITORS', slug: 'monitors', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
  { name: 'AUDIO', slug: 'audio', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80' },
  { name: 'GRIP & RIGS', slug: 'grip-rigs', image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80' },
  { name: 'LIGHTS', slug: 'lights', image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80' }
];

const getColSpan = (index, total) => {
  if (total === 6) {
    if (index === 0) return "md:col-span-2";
    if (index === 5) return "md:col-span-3";
    return "md:col-span-1";
  }
  
  if (total === 7) {
    if (index === 0) return "md:col-span-2";
    if (index === 5) return "md:col-span-2";
    return "md:col-span-1";
  }

  // Fallback repeating pattern: Row 1 (2, 1), Row 2 (1, 1, 1), Row 3 (2, 1), etc.
  const pattern = [2, 1, 1, 1, 1, 2, 1];
  const span = pattern[index % pattern.length];
  return `md:col-span-${span}`;
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState(DEFAULT_FALLBACK_CATEGORIES);

  useEffect(() => {
    api.categories.getAll()
      .then((data) => {
        if (data && data.length > 0) {
          // Sort categories to match the symmetric layout: Row 1 (Cameras, Lenses), Row 2 (Monitors, Audio, Grip & Rigs), Row 3 (Lights)
          const customOrder = ['cameras', 'lenses', 'monitors', 'audio', 'grip-rigs', 'lights'];
          const sorted = [...data].sort((a, b) => {
            const indexA = customOrder.indexOf(a.slug || a.name.toLowerCase());
            const indexB = customOrder.indexOf(b.slug || b.name.toLowerCase());
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
          });
          setCategories(sorted);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <section id="categories" className="bg-[#140e12] py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center text-white mb-12 tracking-tight uppercase">Equipment Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 7).map((cat, idx) => (
            <Link 
              key={cat.slug || idx} 
              href={`/products/${cat.slug || cat.name.toLowerCase()}`}
              className={`group relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-neutral-900 cursor-pointer h-60 md:h-64 block transition-all duration-300 hover:shadow-2xl hover:border-neutral-800 ${getColSpan(idx, categories.length)}`}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-75" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#FFFFFF] opacity-70 uppercase block">
                      RENT
                    </span>
                    <h3 className="text-white font-black text-xl md:text-2xl tracking-tight leading-none uppercase">
                      {cat.name}
                    </h3>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#600138] group-hover:scale-110 shrink-0">
                    <svg 
                      className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
