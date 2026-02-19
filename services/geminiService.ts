import { GoogleGenAI, Type } from "@google/genai";
import { GiftPreference, GiftSuggestion } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the client
const ai = new GoogleGenAI({ apiKey: apiKey });

const generateImageForGift = async (gift: GiftSuggestion): Promise<string | undefined> => {
  const imageModel = "gemini-2.5-flash-image";
  const prompt = `Professional product photography of a ${gift.name}. ${gift.description}. High-quality, clean background, aesthetic lighting, premium gifting style.`;

  try {
    const response = await ai.models.generateContent({
      model: imageModel,
      contents: {
        parts: [{ text: prompt }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error(`Error generating image for ${gift.name}:`, error);
  }
  return undefined;
};

export const generateGiftSuggestions = async (prefs: GiftPreference): Promise<GiftSuggestion[]> => {
  const modelId = "gemini-3-flash-preview";
  
  const prompt = `
    Suggest 6 unique, thoughtful, and creative gift ideas for my ${prefs.partnerType} in India.
    
    Context:
    - Occasion: ${prefs.occasion}
    - Interests/Hobbies: ${prefs.interests}
    - Budget Range: ${prefs.budget} (in Indian Rupees - INR)
    - Desired Vibe: ${prefs.vibe}
    - Market: Assume the user is in India and looking for items available on Indian e-commerce sites like Amazon.in, Flipkart, Myntra, or local boutiques.

    For each gift, provide:
    1. A catchy name.
    2. A short description (under 20 words).
    3. A reason why it fits this specific person/occasion.
    4. An estimated price in INR (e.g., ₹1,200).
    5. A search query string optimized for Indian shopping sites.
    6. A category (e.g., Tech, Fashion, Experience, Home Decor).

    Ensure the output is strictly valid JSON matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              reason: { type: Type.STRING },
              estimatedPrice: { type: Type.STRING },
              searchQuery: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["name", "description", "reason", "estimatedPrice", "searchQuery", "category"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from AI");
    }

    const suggestions = JSON.parse(jsonText) as GiftSuggestion[];

    // Generate images for all suggestions in parallel
    const suggestionsWithImages = await Promise.all(
      suggestions.map(async (gift) => {
        const imageUrl = await generateImageForGift(gift);
        return { ...gift, imageUrl };
      })
    );

    return suggestionsWithImages;
  } catch (error) {
    console.error("Error fetching gift suggestions:", error);
    throw error;
  }
};
