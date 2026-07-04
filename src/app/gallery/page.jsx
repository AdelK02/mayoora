"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FloatingContact from "@/components/FloatingContact";

import { api } from '@/utils/api';
import { motion } from 'framer-motion';

const getYouTubeEmbedUrl = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` 
    : url;
};

const getVimeoEmbedUrl = (url) => {
  const regExp = /vimeo\.com\/([0-9]+)/;
  const match = url.match(regExp);
  return match 
    ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` 
    : url;
};

const GalleryContent = () => {
  const [filter, setFilter] = useState('ALL');
  const [activeImage, setActiveImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    api.gallery.getAll()
      .then(data => setGalleryItems(data || []))
      .catch(err => console.error("Error loading gallery items:", err));
  }, []);

  const filteredImages = galleryItems.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'PHOTOS') return item.category === 'PHOTO';
    if (filter === 'VIDEOS') return item.category === 'VIDEO';
    return true;
  });

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = filteredImages.findIndex(img => img.id === activeImage.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setActiveImage(filteredImages[prevIndex]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredImages.findIndex(img => img.id === activeImage.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setActiveImage(filteredImages[nextIndex]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeImage) return;
      if (e.key === 'Escape') setActiveImage(null);
      if (e.key === 'ArrowLeft') {
        const currentIndex = filteredImages.findIndex(img => img.id === activeImage.id);
        if (currentIndex === -1) return;
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setActiveImage(filteredImages[prevIndex]);
      }
      if (e.key === 'ArrowRight') {
        const currentIndex = filteredImages.findIndex(img => img.id === activeImage.id);
        if (currentIndex === -1) return;
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setActiveImage(filteredImages[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, filteredImages]);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'photos') {
      setFilter('PHOTOS');
    } else if (type === 'videos') {
      setFilter('VIDEOS');
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[#140e12]">
      {/* <TopBar /> */}
      <Navbar />
      <PageHero title="GALLERY" bgImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80" />

      {/* Filter Tabs */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['ALL', 'PHOTOS', 'VIDEOS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-10 py-3 rounded-full font-black tracking-widest text-sm transition-all duration-300 ${
                filter === cat 
                ? 'bg-[#600138] text-white shadow-xl scale-110' 
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-[#1c1418] border border-white/5 rounded-3xl max-w-2xl mx-auto p-10 space-y-4">
            <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">No media items available yet</p>
            <p className="text-sm text-gray-500">More gallery content will be posted soon. Follow our social channels below to see our latest projects!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (idx % 4) * 0.08 }}
                className="w-full aspect-square"
              >
                <div 
                  className="w-full h-full relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-[#1c1418] border border-white/5"
                  onClick={() => setActiveImage(img)}
                >
                  {img.category === 'VIDEO' ? (
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Play Icon Backdrop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/80 z-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-[#600138] hover:bg-[#7A0247] rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <span className="bg-[#600138] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider self-start">
                          {img.category}
                        </span>
                        <h4 className="text-white font-black text-xs uppercase tracking-wide line-clamp-2">
                          {img.title || 'Cinematic Video'}
                        </h4>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={img.url} 
                        alt={img.title || img.category} 
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="text-white border-2 border-white px-6 py-2 font-black tracking-widest text-xs uppercase">
                          VIEW IMAGE
                        </span>
                      </div>
                      <div className="absolute top-4 left-4 bg-[#600138] text-white text-[10px] font-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        {img.category}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#140e12] text-center">
        <h2 className="text-3xl font-black text-[#600138] uppercase mb-8">Follow Our Work</h2>
        <div className="flex justify-center space-x-6">
          <button className="border-2 border-[#600138] text-[#600138] px-8 py-3 rounded-md font-bold hover:bg-[#600138] hover:text-white transition-all">INSTAGRAM</button>
          <button className="border-2 border-[#600138] text-[#600138] px-8 py-3 rounded-md font-bold hover:bg-[#600138] hover:text-white transition-all">FACEBOOK</button>
        </div>
      </section>

      <Footer />
      <FloatingContact />

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveImage(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-50 focus:outline-none"
            onClick={() => setActiveImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Controls */}
          <button 
            className="absolute left-6 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-50 focus:outline-none"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute right-6 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-50 focus:outline-none"
            onClick={handleNext}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Media Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {activeImage.category === 'VIDEO' ? (
              activeImage.url.includes('youtube.com') || activeImage.url.includes('youtu.be') || activeImage.url.includes('vimeo.com') ? (
                <iframe 
                  src={activeImage.url.includes('vimeo.com') ? getVimeoEmbedUrl(activeImage.url) : getYouTubeEmbedUrl(activeImage.url)}
                  className="w-[80vw] h-[45vw] max-w-5xl max-h-[80vh] rounded-xl shadow-2xl"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  src={activeImage.url} 
                  controls 
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
                />
              )
            ) : (
              <img 
                src={activeImage.url} 
                alt={activeImage.title || 'Expanded Gallery View'} 
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

const GalleryPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <GalleryContent />
    </Suspense>
  );
};

export default GalleryPage;
