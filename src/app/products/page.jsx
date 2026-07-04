"use client";

import React, { useState, useEffect } from 'react';
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FloatingContact from "@/components/FloatingContact";
import Link from 'next/link';
import { api } from '@/utils/api';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load categories and products dynamically from API
    Promise.all([api.categories.getAll(), api.products.getAll()])
      .then(([cats, prods]) => {
        // Map each category to calculate count dynamically
        const computedCats = cats.map(cat => {
          const count = prods.filter(p => p.category === cat.slug).length;
          return { ...cat, count };
        });
        setCategories(computedCats);
      })
      .catch(err => console.error("Error loading categories/products:", err));
  }, []);

  return (
    <main className="min-h-screen bg-[#140e12]">
      {/* <TopBar /> */}
      <Navbar />
      <PageHero title="OUR PRODUCTS" bgImage="https://images.unsplash.com/photo-1588290957812-ae74d9e17288?q=80&w=1360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      {/* Category Grid */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Browse by Category</h2>
          <div className="w-24 h-1 bg-[#600138] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (idx % 3) * 0.1 }}
              className="h-96"
            >
              <Link 
                href={`/products/${cat.slug}`}
                className="group relative w-full h-full overflow-hidden rounded-3xl shadow-lg cursor-pointer block"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <span className="text-[#E2D1A1] text-xs font-black tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase">
                    {cat.count} Items Available
                  </span>
                  <h3 className="text-white text-3xl font-black tracking-tighter uppercase mb-4">
                    {cat.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-white/70 font-bold group-hover:text-white transition-colors">
                    <span className="text-sm">EXPLORE NOW</span>
                    <div className="w-0 group-hover:w-8 h-[2px] bg-[#E2D1A1] transition-all duration-300"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="bg-[#140e12] py-20 px-6 md:px-20 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="space-y-6 md:max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-none">Need a Custom <br /> Package?</h2>
            <p className="text-lg opacity-80 font-medium">Contact our team for personalized equipment bundles tailored to your specific project needs.</p>
            <a 
              href="https://wa.me/919496350343"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#600138] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl"
            >
              ENQUIRE NOW
            </a>
          </div>
          <div className="w-full md:w-1/3 opacity-20">
            <img src="/logo-dark-no-bg.png" alt="Logo" className="w-full rounded-2xl invert" />
          </div>
        </div>
        {/* Abstract Background Element */}
        {/* <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div> */}
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
};

export default ProductsPage;
