  "use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import OffersSection from "@/components/OffersSection";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import FloatingContact from "@/components/FloatingContact";
import { api } from '@/utils/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [popupSettings, setPopupSettings] = useState(null);

  useEffect(() => {
    // Load dynamic products from backend API
    api.products.getAll()
      .then(allProducts => {
        setProducts(allProducts.slice(0, 3));
      })
      .catch(err => console.error("Error fetching featured products:", err));

    // Load dynamic promo popup configuration from backend API
    api.promoPopup.get()
      .then(setPopupSettings)
      .catch(err => console.error("Error fetching promo popup settings:", err));
  }, []);

  return (
    <main className=" min-h-screen">
      {/* <TopBar /> */}
      <Navbar />
      <Hero />
      
      {/* <AboutSection /> */}
      
      <CategoryGrid />
      
      <section className="bg-[#140e12] py-20 px-6 md:px-20 mx-auto">
        <h2 className="text-3xl font-black text-white mb-12 tracking-tight uppercase border-l-8 border-[#600138] pl-6 ">
          Featured Equipment
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </section>

      <OffersSection />
      
      <section className="bg-[#140e12] py-24 px-6 md:px-20 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Unique Weapons <br /> for Film Making
          </h2>
          <p className="text-xl opacity-80 font-light">
            We provide the most advanced tools for the modern cinematographer.
          </p>
          <div className="pt-6">
            <Link href="/products" className="inline-block bg-white text-[#600138] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <PromoPopup settings={popupSettings} />
      <FloatingContact />
    </main>
  );
}
