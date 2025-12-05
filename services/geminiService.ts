import { GoogleGenAI } from "@google/genai";
import { PlannerFormData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Use Flash model for speed and low cost
const MODEL_NAME = 'gemini-2.5-flash';

// --- CACHING UTILITIES ---
// In a production app, you might use a database (Supabase/Firebase).
// For now, we use localStorage to save costs on the user's session.
const getCachedResponse = (key: string): string | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) return cached;
  } catch (e) {
    console.warn("Cache retrieval failed", e);
  }
  return null;
};

const setCachedResponse = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn("Cache save failed", e);
  }
};

const generateCacheKey = (prefix: string, data: any) => {
  return `${prefix}_${JSON.stringify(data)}`;
};
// -------------------------

export const generateSmartHomePlan = async (data: PlannerFormData): Promise<string> => {
  const cacheKey = generateCacheKey('plan', data);
  const cached = getCachedResponse(cacheKey);
  if (cached) return cached;

  try {
    const prioritiesStr = data.priorities.join(", ");
    const prompt = `
      Act as a Smart Home Sales Engineer designed to monetize content. 
      The user wants a smart home plan.

      User Profile:
      - Home Type: ${data.homeType}
      - Ecosystem: ${data.ecosystem}
      - Budget: ${data.budget}
      - Tech Level: ${data.skillLevel}
      - Priorities: ${prioritiesStr}

      Task:
      Generate a practical setup guide. 
      
      CRITICAL MONETIZATION REQUIREMENT:
      When recommending specific products, DO NOT just write the name. 
      Format them as Markdown links searching on Amazon. 
      Format: [Product Name](https://www.amazon.com/s?k=Product+Name+${data.ecosystem.replace(' ', '+')})
      
      Structure (Markdown):
      1. **Hub Choice**: The brain of the system.
      2. **Essential Devices**: List 3-5 specific devices (bulbs, plugs, sensors) matching the budget. Use the link format above.
      3. **Automation Logic**: One "If This Then That" scenario.
      4. **Cost Estimate**: Rough math.
      
      Keep it concise to save tokens.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    const text = response.text || "Sorry, generation failed.";
    setCachedResponse(cacheKey, text); // Save to cache
    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating plan. Please try again in a moment.";
  }
};

export const checkDeviceCompatibility = async (deviceA: string, deviceB: string): Promise<string> => {
  // Normalize inputs to improve cache hit rate (e.g., "alexa" == "Alexa")
  const key = generateCacheKey('comp', { a: deviceA.toLowerCase().trim(), b: deviceB.toLowerCase().trim() });
  const cached = getCachedResponse(key);
  if (cached) return cached;

  try {
    const prompt = `
      Act as a Tech Compatibility Database.
      User asks: "Does ${deviceA} work with ${deviceB}?"
      
      Task:
      1. Answer YES, NO, or REQUIRES BRIDGE (Bold this part).
      2. Explanation: 2 sentences max on protocols (Zigbee/Thread/WiFi).
      3. Workaround: If NO, suggest a specific bridge or hub product formatted as an Amazon Search link: [Bridge Name](https://www.amazon.com/s?k=Bridge+Name).
      
      Keep it short.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    const text = response.text || "Analysis failed.";
    setCachedResponse(key, text);
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error checking compatibility.";
  }
};

export const troubleshootIssue = async (problemDescription: string): Promise<string> => {
  // Troubleshooting is less likely to be repeated exactly, but we cache briefly anyway
  const key = generateCacheKey('fix', problemDescription.toLowerCase().trim());
  const cached = getCachedResponse(key);
  if (cached) return cached;

  try {
    const prompt = `
      Act as Smart Home Support.
      Problem: "${problemDescription}"
      
      Provide 3 numbered steps to fix it. 
      If a tool/replacement is likely needed (e.g. a new router, a battery), link to it on Amazon: [Item](https://www.amazon.com/s?k=Item).
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    const text = response.text || "Could not generate steps.";
    setCachedResponse(key, text);
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Service temporarily unavailable.";
  }
};