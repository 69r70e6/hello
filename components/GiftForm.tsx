import React, { useState } from 'react';
import { GiftPreference } from '../types';
import { Heart, Gift, IndianRupee, Calendar, Smile } from 'lucide-react';

interface GiftFormProps {
  onSubmit: (prefs: GiftPreference) => void;
  isLoading: boolean;
}

const PARTNER_TYPES = ["Girlfriend", "Boyfriend", "Wife", "Husband", "Partner", "Friend"];
const OCCASIONS = ["Birthday", "Anniversary", "Valentine's Day", "Diwali", "Wedding", "Just Because", "Apology"];
const VIBES = ["Romantic", "Practical", "Funny", "Sentimental", "Luxurious", "Creative"];
const BUDGETS = ["Under ₹500", "₹500 - ₹2000", "₹2000 - ₹5000", "₹5000 - ₹15000", "₹15000+"];

export const GiftForm: React.FC<GiftFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<GiftPreference>({
    partnerType: PARTNER_TYPES[0],
    occasion: OCCASIONS[0],
    interests: '',
    budget: BUDGETS[1],
    vibe: VIBES[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, interests: e.target.value });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-100">
      <div className="bg-brand-600 p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-white flex items-center justify-center gap-2">
          <Heart className="fill-brand-300 text-brand-300" />
          Find the Perfect Gift
          <Heart className="fill-brand-300 text-brand-300" />
        </h2>
        <p className="text-brand-100 mt-2">Tell us about your special someone in India</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Heart className="w-4 h-4 text-brand-500" /> Who is this for?
            </label>
            <select
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              value={formData.partnerType}
              onChange={(e) => setFormData({...formData, partnerType: e.target.value})}
            >
              {PARTNER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-brand-500" /> Occasion
            </label>
            <select
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              value={formData.occasion}
              onChange={(e) => setFormData({...formData, occasion: e.target.value})}
            >
              {OCCASIONS.map(occ => <option key={occ} value={occ}>{occ}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Gift className="w-4 h-4 text-brand-500" /> Interests & Hobbies
          </label>
          <textarea
            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition h-24 resize-none"
            placeholder="e.g. loves Bollywood, filter coffee, trekking, traditional jewelry..."
            value={formData.interests}
            onChange={handleInterestChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <IndianRupee className="w-4 h-4 text-brand-500" /> Budget
            </label>
            <select
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            >
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Smile className="w-4 h-4 text-brand-500" /> Vibe
            </label>
            <select
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              value={formData.vibe}
              onChange={(e) => setFormData({...formData, vibe: e.target.value})}
            >
              {VIBES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800'}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            <>
              Generate Ideas <Gift className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
