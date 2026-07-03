"use client";

import React from 'react';
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FloatingContact from "@/components/FloatingContact";
import { CheckCircle, Target, Eye, Award, ShieldCheck, Clock } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#140e12]">
      {/* <TopBar /> */}
      <Navbar />
      <PageHero title="ABOUT US" bgImage="https://images.unsplash.com/photo-1556132877-ded3bb0173b5?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      {/* Main Content */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80" 
              alt="About Mayoora" 
              className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
          <div className="space-y-8">
            <div className="inline-block border-l-8 border-[#600138] pl-6">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Who We Are</h2>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed font-medium">
              Mayoora Cine Rentals is a premier cinema equipment rental provider dedicated to empowering filmmakers and content creators with top-tier technology. As a specialized branch of Mayoora Creations, we bring years of industry expertise to the table, ensuring that every production—from indie projects to major features—has access to the best cinematic tools available.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our collection features Netflix-approved cameras, high-end lighting solutions, and crystal-clear audio equipment. We don't just rent gear; we provide the technical foundation for your creative vision.
            </p>
            
            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Netflix Approved Gear",
                "24/7 Technical Support",
                "On-site Assistants",
                "Flexible Rental Plans"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-white font-bold">
                  <CheckCircle className="w-5 h-5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#140e12] py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-gray-300 p-12 rounded-3xl shadow-xl hover-lift border-b-8 border-[#600138]">
            <Target className="w-16 h-16 text-[#600138] mb-8" />
            <h3 className="text-3xl font-black text-[#600138] mb-6 uppercase">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              To democratize high-end filmmaking by providing affordable access to world-class equipment and professional support, enabling storytellers to realize their vision without compromise.
            </p>
          </div>
          <div className="bg-[#600138] p-12 rounded-3xl shadow-xl hover-lift text-white">
            <Eye className="w-16 h-16 text-[#E2D1A1] mb-8" />
            <h3 className="text-3xl font-black text-[#E2D1A1] mb-6 uppercase">Our Vision</h3>
            <p className="text-gray-200 text-lg leading-relaxed font-medium opacity-90">
              To become the most trusted cinematic partner in the region, recognized for our commitment to quality, innovation, and the success of the creative community.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Expertise */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-16 uppercase tracking-tighter">Why Choose Mayoora?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="mx-auto w-20 h-20 bg-[#E2D1A1]/30 rounded-full flex items-center justify-center text-white">
              <Award className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold uppercase text-white">Industry Expertise</h4>
            <p className="text-gray-400 text-sm font-medium">Over a decade of experience in film production and equipment management.</p>
          </div>
          <div className="space-y-6">
            <div className="mx-auto w-20 h-20 bg-[#E2D1A1]/30 rounded-full flex items-center justify-center text-white">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold uppercase text-white">Authorized Gear</h4>
            <p className="text-gray-400 text-sm font-medium">Genuine, well-maintained equipment from brands like SONY, RED, and ARRI.</p>
          </div>
          <div className="space-y-6">
            <div className="mx-auto w-20 h-20 bg-[#E2D1A1]/30 rounded-full flex items-center justify-center text-white">
              <Clock className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold uppercase text-white">Reliable Service</h4>
            <p className="text-gray-400 text-sm font-medium">Prompt delivery and expert assistants included with premium kits.</p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
};

export default AboutPage;
