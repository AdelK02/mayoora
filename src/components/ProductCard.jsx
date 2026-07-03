import React from 'react';

const ProductCard = ({ title, image, features, description, footerText, price, showFeatures = false, showDescription = false }) => {
  return (
    <div className="bg-white border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 group rounded-[2rem] flex flex-col h-full transition-all duration-500">
      
      {/* Product Image Container */}
      <div className="relative w-full h-56 bg-gray-50 overflow-hidden flex items-center justify-center p-6 border-b border-gray-100">
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.02] z-10" />
        <img 
          src={image} 
          alt={title} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700 z-0 drop-shadow-md" 
        />
        
        {/* Category / Badge overlay */}
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#E2D1A1] border border-white/10 flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#600138]"></span>
          <span className="text-[#E2D1A1]">Cinema Line</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center space-x-1.5 text-[9px] font-black tracking-widest text-[#600138] uppercase">
            <span>Netflix Approved</span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase leading-tight group-hover:text-[#600138] transition-colors line-clamp-2">
            {title}
          </h3>
          
          {/* Price */}
          {price && (
            <p className="text-[#600138] font-black text-base pt-0.5">
              ₹ {price} <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ Day</span>
            </p>
          )}
          
          {/* Optional Description / Features */}
          {(showFeatures || showDescription) && (
            <div className="border-t border-gray-100 pt-3 space-y-3">
              {description && (
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {description}
                </p>
              )}
              {!description && features && features.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="w-1 h-1 bg-[#600138] rounded-full mr-2 shrink-0"></span>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* WhatsApp Enquiry Button */}
        <div>
          <a 
            href={`https://wa.me/919496350343?text=Hi%20Mayoora%2C%20I%20am%20interested%20in%20renting%20the%20${encodeURIComponent(title)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#600138] hover:bg-[#7A0247] text-white py-3.5 px-4 rounded-2xl text-center text-xs font-black uppercase tracking-widest block transition-all shadow-md hover:-translate-y-0.5"
          >
            {footerText || 'ENQUIRE NOW'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
