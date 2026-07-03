import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, Camera, Play } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#140e12] text-white pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About Column */}
        <div className="space-y-6">
          <img 
            src="/logo-dark-no-bg.png" 
            alt="Mayoora Logo" 
            className="h-16 w-auto rounded-lg"
          />
          <p className="text-gray-400 text-sm leading-relaxed">
            Leading cinema equipment rental service provider in Kerala, offering premium gear for your cinematic productions.
          </p>
          <div className="flex space-x-4">
            <MessageSquare className="w-5 h-5 hover:text-[#600138] cursor-pointer transition-colors" />
            <Camera className="w-5 h-5 hover:text-[#600138] cursor-pointer transition-colors" />
            <Play className="w-5 h-5 hover:text-[#600138] cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold border-l-4 border-[#600138] pl-3">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold border-l-4 border-[#600138] pl-3">Our Products</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-white transition-colors">Sony FX6</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Sony FX3</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Red Komodo</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Arri Alexa</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold border-l-4 border-[#600138] pl-3">Get in Touch</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-[#600138] shrink-0" />
              <span>Cochin, Kerala, India</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-[#600138] shrink-0" />
              <span>+91 9496 350 343</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-[#600138] shrink-0" />
              <span>info@mayooracinerentals.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Mayoora Cine Rentals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
