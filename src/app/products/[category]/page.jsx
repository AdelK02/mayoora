// src/app/products/[category]/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FloatingContact from "@/components/FloatingContact";
import ProductCard from "@/components/ProductCard";
import { api } from '@/utils/api';

const CategoryPage = () => {
  const params = useParams();
  
  const [products, setProducts] = useState([]);
  const [displayTitle, setDisplayTitle] = useState('');
  const [categoryFound, setCategoryFound] = useState(true);

  // Normalize current category slug from URL parameter
  const categorySlug = params.category?.toLowerCase() || 'cameras';

  useEffect(() => {
    Promise.all([api.products.getAll(), api.categories.getAll()])
      .then(([allProducts, categories]) => {
        // Check if category slug exists
        const matchingCat = categories.find(c => c.slug === categorySlug);
        
        if (matchingCat) {
          setCategoryFound(true);
          setDisplayTitle(matchingCat.name);
        } else {
          // Fallback display
          setCategoryFound(false);
          setDisplayTitle(categorySlug.toUpperCase());
        }

        // Filter products under this slug
        const filtered = allProducts.filter(p => p.category === categorySlug);
        setProducts(filtered);
      })
      .catch(err => console.error("Error loading products for category:", err));
  }, [categorySlug]);

  return (
    <main className="min-h-screen bg-[#140e12]">
      {/* <TopBar /> */}
      <Navbar />
      <PageHero 
        title={displayTitle} 
        bgImage="https://images.unsplash.com/photo-1588290957812-ae74d9e17288?q=80&w=1360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      />

      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
              {displayTitle} Selection
            </h2>
            <div className="w-24 h-1 bg-[#600138]"></div>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
            {products.length} Products Found
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={idx} {...product} showDescription={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
              No products found in this category
            </h3>
            <p className="mt-4 text-gray-400">Please check our other categories or contact us for custom requests.</p>
          </div>
        )}
      </section>

      <section className="bg-[#140e12] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-black text-white uppercase">Looking for something else?</h3>
          <p className="text-gray-400 font-medium">Our inventory is constantly expanding. If you don't see what you need, call us at <span className="text-white font-bold">+91 9496 350 343</span></p>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
};

export default CategoryPage;
