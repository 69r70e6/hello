import React from 'react';
import { GiftSuggestion } from '../types';
import { GiftCard } from './GiftCard';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface GiftListProps {
  suggestions: GiftSuggestion[];
  onReset: () => void;
}

export const GiftList: React.FC<GiftListProps> = ({ suggestions, onReset }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Try Again
        </button>
        <div className="text-center">
           <h2 className="text-3xl font-serif font-bold text-gray-900 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400 fill-yellow-400" />
            Curated For You
            <Sparkles className="text-yellow-400 fill-yellow-400" />
           </h2>
           <p className="text-gray-500 mt-1">Tap a retailer to purchase</p>
        </div>
        <div className="w-24 hidden md:block"></div> {/* Spacer for centering */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {suggestions.map((gift, index) => (
          <GiftCard key={index} gift={gift} index={index} />
        ))}
      </div>
    </div>
  );
};
