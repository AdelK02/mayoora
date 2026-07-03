"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[550px] md:h-[calc(100vh-140px)] min-h-[500px] max-h-[800px] overflow-hidden bg-black flex items-center -mt-[76px] pt-[76px] lg:-mt-[112px] lg:pt-[112px]">
      {/* Background Image with Zoom-in Animation */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/HeroImage.jpg')" }}
      />
      
      {/* Dark overlay gradients for premium look and high contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#140e12] via-transparent to-black/20 z-10" />

      {/* Floating subtle light glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#600138]/10 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Hero Content */}
      <div className="relative z-20 w-full px-6 md:px-20 max-w-7xl mx-auto text-white">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          
          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <span className="h-1 w-12 bg-[#E2D1A1] rounded-full" />
            <span className="text-[#E2D1A1] uppercase tracking-[0.2em] font-black text-xs md:text-sm">
              Mayoora Cine Rentals
            </span>
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] drop-shadow-2xl font-sans"
          >
            Equipping Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2D1A1] via-white to-gray-300">
              Creative Vision
            </span>
          </motion.h1>
          
          {/* Paragraph Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="text-base md:text-xl text-gray-300 font-normal max-w-2xl leading-relaxed drop-shadow-md"
          >
            At Mayoora Cine Rentals, we provide a full range of high-quality filmmaking equipment and production tools—from advanced cameras and lenses to precision lighting and grip rigs.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="pt-4 flex flex-wrap gap-4 md:gap-5"
          >
            <a 
              href="/products" 
              className="bg-[#600138] text-white px-8 py-4 rounded-full font-black uppercase tracking-wider hover:bg-[#7A0247] transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(96,1,56,0.3)] shadow-lg border border-[#600138] duration-300 text-xs md:text-sm"
            >
              View Gear
            </a>
            <a 
              href="/contact" 
              className="bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 hover:shadow-xl border border-white/20 duration-300 text-xs md:text-sm"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
