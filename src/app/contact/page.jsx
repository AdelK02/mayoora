"use client";

import React from 'react';
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FloatingContact from "@/components/FloatingContact";
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const branches = [
    {
      city: "Kozhikode",
      address: "Mayoora Cine Rentals, Near Bypass Road, Kozhikode, Kerala",
      phone: "+91 9496 350 343",
      email: "kozhikode@mayooracinerentals.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.853045165215!2d75.81926867475962!3d11.27218698891461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6599b50000001%3A0xb3e1c6b30f40a76!2sMayoora%20Creations!5e0!3m2!1sen!2sin!4v1715770000000!5m2!1sen!2sin"
    },
    {
      city: "Thrissur",
      address: "First Floor, Cinema Plaza, Thrissur, Kerala",
      phone: "+91 9496 350 343",
      email: "thrissur@mayooracinerentals.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.569428784114!2d76.21443497474936!3d10.534575989601007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee46d0000001%3A0x7b6f797539f3796d!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1715770000000!5m2!1sen!2sin"
    }
  ];

  return (
    <main className="min-h-screen bg-[#140e12]">
      {/* <TopBar /> */}
      <Navbar />
      <PageHero title="CONTACT US" bgImage="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80" />

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Get In Touch</h2>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto">We are ready to assist you with your production requirements across multiple locations in Kerala.</p>
        </div>

        <div className="space-y-32">
          {branches.map((branch, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Info Column */}
              <div className="lg:w-1/2 space-y-10">
                <div className="inline-block bg-[#600138] text-white px-8 py-2 rounded-full font-black uppercase tracking-widest text-sm">
                  {branch.city} Office
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#600138] group-hover:bg-[#600138] group-hover:text-white transition-all duration-300 shadow-sm mr-6 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase text-gray-400 mb-1 tracking-tight">Our Address</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#600138] group-hover:bg-[#600138] group-hover:text-white transition-all duration-300 shadow-sm mr-6 shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase text-gray-400 mb-1 tracking-tight">Call Anytime</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">{branch.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#600138] group-hover:bg-[#600138] group-hover:text-white transition-all duration-300 shadow-sm mr-6 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase text-gray-400 mb-1 tracking-tight">Email Us</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">{branch.email}</p>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="bg-[#600138]/10 border-l-4 border-[#600138] p-8 rounded-r-2xl">
                  <div className="flex items-center space-x-3 text-gray-400 font-black uppercase tracking-widest text-xs mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Office Hours</span>
                  </div>
                  <p className="text-gray-400 font-bold">Monday - Saturday: 09:00 AM - 07:00 PM</p>
                  <p className="text-gray-400 opacity-70 font-medium text-sm mt-1">Sundays: Available on prior booking</p>
                </div>
              </div>

              {/* Map Column */}
              <div className="lg:w-1/2 w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50 relative group">
                <iframe 
                  src={branch.mapUrl}
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Banner */}
      <section className="bg-[#140e12] py-24 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-400 uppercase">Need Immediate Assistance?</h2>
          <p className="text-gray-400 font-medium text-lg">Click the WhatsApp button below to chat with our technical experts instantly.</p>
          <a 
            href="https://wa.me/919496350343" 
            target="_blank" 
            className="inline-flex items-center space-x-3 bg-green-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl hover:-translate-y-1"
          >
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
};

export default ContactPage;
