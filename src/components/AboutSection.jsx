import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block border-b-2 border-[#600138] pb-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#600138]">Mayoora Cine Rental</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed font-medium">
            At 'Mayoora Cine Rentals', we provide a full range of high-quality 'filmmaking equipment and production' tools to help bring your creative vision to life. As a specialized rental department of 'Mayoora Creations', we are dedicated to supporting filmmakers, content creators, and production houses with the latest cameras, lighting, and other cinematic essentials.
          </p>
          <button className="bg-[#600138] text-white px-8 py-3 rounded-md font-bold hover:bg-[#7A0247] transition-all transform hover:-translate-y-1 shadow-lg">
            READ MORE
          </button>
        </div>
        <div className="relative">
          <div className="bg-[#600138] absolute inset-0 transform translate-x-4 translate-y-4 rounded-lg -z-10 opacity-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80" 
            alt="About Mayoora Cine Rentals" 
            className="rounded-lg shadow-2xl border-4 border-white"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
