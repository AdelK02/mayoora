"use client";

import React, { useState, useEffect } from 'react';
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FloatingContact from "@/components/FloatingContact";
import ProductCard from "@/components/ProductCard";
import { api } from '@/utils/api';

const ServicesPage = () => {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    // Load dynamic kits from backend API
    api.products.getAll()
      .then(allProducts => {
        const kitList = allProducts.filter(p => p.isKit === true);
        setKits(kitList);
      })
      .catch(err => console.error("Error loading services kits:", err));
  }, []);

  return (
    <main className="min-h-screen bg-[#140e12]">
      {/* <TopBar /> */}
      <Navbar />
      <PageHero title="OUR SERVICES" bgImage="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80" />

      {/* Services Intro */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Professional Cinema Solutions</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
          We offer complete production kits designed for professional filmmaking. Each kit comes with essential accessories and the option for skilled technical support to ensure your shoot runs smoothly.
        </p>
      </section>

      {/* Kits Showcase */}
      <section className="bg-[#140e12] py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {kits.map((kit, idx) => (
              <ProductCard key={idx} {...kit} showDescription={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Support Section */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Skilled Crew Support</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Rentals from Mayoora include more than just gear. We provide experienced Focus Pullers and Camera Assistants who know our equipment inside out. This minimizes setup time and technical issues on set, allowing you to focus purely on your creative vision.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-[#600138] rounded-full flex items-center justify-center text-white shrink-0">1</div>
                <p className="font-bold text-[#600138]">Expert Focus Pullers (Bata included in select kits)</p>
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-[#600138] rounded-full flex items-center justify-center text-white shrink-0">2</div>
                <p className="font-bold text-[#600138]">Skilled Camera Assistants</p>
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-[#600138] rounded-full flex items-center justify-center text-white shrink-0">3</div>
                <p className="font-bold text-[#600138]">Equipment Maintenance on Location</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=800&q=80" 
              alt="Support Staff" 
              className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#E2D1A1] p-10 rounded-2xl shadow-xl hidden lg:block">
              <span className="text-[#600138] font-black text-5xl ">100%</span>
              <p className="text-[#600138] font-bold uppercase text-xs tracking-widest mt-2">Technical Support</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
};

export default ServicesPage;
