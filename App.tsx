import React, { useState } from 'react';
import { GiftForm } from './components/GiftForm';
import { GiftList } from './components/GiftList';
import { AppState, GiftPreference, GiftSuggestion } from './types';
import { generateGiftSuggestions } from './services/geminiService';
import { Gift } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (prefs: GiftPreference) => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const results = await generateGiftSuggestions(prefs);
      setSuggestions(results);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("We couldn't generate suggestions at the moment. Please check your API Key or try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setSuggestions([]);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-brand-600 p-2 rounded-lg">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Cupid<span className="text-brand-600">AI</span></h1>
          </div>
          <div className="text-sm font-medium text-gray-500 hidden sm:block">
            Thoughtful Gifting Made Simple
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        
        {appState === AppState.IDLE && (
          <div className="w-full flex flex-col items-center animate-fade-in-up">
            <div className="text-center mb-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Struggling to find the <span className="text-brand-600">perfect gift</span>?
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Let our AI Cupid analyze your partner's interests and find unique, personalized gifts from custom shops in seconds.
              </p>
            </div>
            <GiftForm onSubmit={handleFormSubmit} isLoading={false} />
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="w-full flex flex-col items-center justify-center py-20 animate-pulse text-center">
             <div className="bg-white p-8 rounded-full shadow-xl mb-6 relative">
               <Gift className="w-16 h-16 text-brand-500 animate-bounce" />
               <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
             </div>
             <h3 className="text-2xl font-serif font-bold text-gray-800">Consulting Cupid...</h3>
             <p className="text-gray-500 mt-2">Searching for items and designing visual previews</p>
             <p className="text-xs text-brand-400 mt-4 uppercase tracking-widest font-semibold">Generating AI Product Images</p>
          </div>
        )}

        {appState === AppState.RESULTS && (
          <div className="w-full animate-fade-in">
            <GiftList suggestions={suggestions} onReset={handleReset} />
          </div>
        )}

        {appState === AppState.ERROR && (
           <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-red-100 text-center">
             <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <span className="text-3xl">💔</span>
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Oops!</h3>
             <p className="text-gray-600 mb-6">{error}</p>
             <button 
               onClick={handleReset}
               className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition"
             >
               Try Again
             </button>
           </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm mt-auto">
        <p>© {new Date().getFullYear()} CupidAI. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
