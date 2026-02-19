export interface GiftPreference {
  partnerType: string; // e.g., "Boyfriend", "Wife", "Partner"
  occasion: string; // e.g., "Anniversary", "Birthday"
  interests: string; // Comma separated list
  budget: string; // e.g., "$50-100"
  vibe: string; // e.g., "Romantic", "Funny", "Practical"
}

export interface GiftSuggestion {
  name: string;
  description: string;
  reason: string;
  estimatedPrice: string;
  searchQuery: string;
  category: string;
  imageUrl?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
