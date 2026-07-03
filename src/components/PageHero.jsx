import React from 'react';
import Link from 'next/link';

const PageHero = ({ title, bgImage }) => {
  return (
    <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden -mt-[76px] pt-[76px] lg:-mt-[112px] lg:pt-[112px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80'}')` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">
          {title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-sm font-medium">
          <Link href="/" className="hover:text-accent transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-accent">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default PageHero;
