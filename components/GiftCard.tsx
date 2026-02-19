import React from 'react';
import { GiftSuggestion } from '../types';
import { ExternalLink, ShoppingBag, IndianRupee, ImageOff } from 'lucide-react';

interface GiftCardProps {
  gift: GiftSuggestion;
  index: number;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, index }) => {
  // Use generated image or fallback to a stylized placeholder if generation failed
  const imgUrl = gift.imageUrl || `https://picsum.photos/400/300?random=${index + 10}`;
  
  // Construct search URLs for the Indian market
  const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(gift.searchQuery)}`;
  const amazonInUrl = `https://www.amazon.in/s?k=${encodeURIComponent(gift.searchQuery)}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-brand-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {gift.imageUrl ? (
          <img 
            src={imgUrl} 
            alt={gift.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
             <ImageOff className="w-10 h-10 mb-2 opacity-20" />
             <span className="text-xs">Preview image unavailable</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-600 shadow-sm uppercase tracking-wide">
          {gift.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight">
            {gift.name}
          </h3>
          <div className="flex items-center text-green-700 bg-green-50 px-2 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ml-2">
            <IndianRupee className="w-3 h-3 mr-0.5" />
            {gift.estimatedPrice.replace('₹', '').replace('INR', '').trim()}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {gift.description}
        </p>
        
        <div className="bg-brand-50 p-3 rounded-xl mb-6">
          <p className="text-xs font-bold text-brand-800 uppercase tracking-wider mb-1">
            Why it's perfect
          </p>
          <p className="text-sm text-brand-900 italic">
            "{gift.reason}"
          </p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <a 
            href={amazonInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
             Amazon.in <ExternalLink className="w-3 h-3" />
          </a>
          <a 
            href={flipkartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border-2 border-brand-500 text-brand-600 rounded-xl text-sm font-medium hover:bg-brand-50 transition"
          >
             Flipkart <ShoppingBag className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
