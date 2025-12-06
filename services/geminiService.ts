import { GoogleGenAI } from "@google/genai";
import { PlannerFormData } from "../types";

// --- CACHING UTILITIES ---
const getCachedResponse = (key: string): string | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) return cached;
  } catch (e) { console.warn("Cache read error", e); }
  return null;
};

const setCachedResponse = (key: string, value: string) => {
  try {
    if (localStorage.length > 50) localStorage.clear();
    localStorage.setItem(key, value);
  } catch (e) { console.warn("Cache write error", e); }
};

const generateCacheKey = (prefix: string, data: any) => `${prefix}_${JSON.stringify(data)}`;

// --- GEMINI API CLIENT ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- EXPORTED FUNCTIONS ---

export const generateSmartHomePlan = async (data: PlannerFormData): Promise<string> => {
  const cacheKey = generateCacheKey('plan', data);
  const cached = getCachedResponse(cacheKey);
  if (cached) return cached;

  const prioritiesStr = data.priorities.join(", ");
  const systemInstruction = `You are an expert Smart Home Consultant. Your goal is to provide a helpful, structured buying guide. 
  
  CRITICAL: You must format all product recommendations as Amazon Search Links using Markdown.
  Format: [Product Name](https://www.amazon.com/s?k=Product+Name+${data.ecosystem.replace(' ', '+')})
  
  Do not include introductory fluff. Go straight to the plan.`;

  const userPrompt = `Create a smart home plan for a ${data.homeType} using ${data.ecosystem}. 
  Budget: ${data.budget}. 
  User Level: ${data.skillLevel}.
  Priorities: ${prioritiesStr}.
  
  Structure:
  1. **Core Hub**: The brain.
  2. **Essential Devices**: 3-4 items based on priorities.
  3. **Automation Idea**: One simple "If This Then That" rule.
  4. **Estimated Total**: Rough cost.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text;
    if (text) {
      setCachedResponse(cacheKey, text);
      return text;
    }
  } catch (error) {
    console.error("Gemini Request Failed:", error);
  }

  return "Error: Unable to generate plan. Please try again later.";
};

export const checkDeviceCompatibility = async (deviceA: string, deviceB: string): Promise<string> => {
  const key = generateCacheKey('comp', { a: deviceA.toLowerCase().trim(), b: deviceB.toLowerCase().trim() });
  const cached = getCachedResponse(key);
  if (cached) return cached;

  const systemInstruction = `You are a strict technical compatibility checker. 
  Answer starts with: **YES**, **NO**, or **REQUIRES BRIDGE**.
  Then explain protocol details (Zigbee/Matter/Thread) in 2 sentences.
  If NO, suggest a bridge with an Amazon link: [Bridge Name](https://www.amazon.com/s?k=Bridge+Name).`;

  const userPrompt = `Check compatibility between ${deviceA} and ${deviceB}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text;
    if (text) {
      setCachedResponse(key, text);
      return text;
    }
  } catch (error) {
    console.error("Gemini Request Failed:", error);
  }

  return "Error: Unable to check compatibility.";
};

export const troubleshootIssue = async (problemDescription: string): Promise<string> => {
  const key = generateCacheKey('fix', problemDescription.toLowerCase().trim());
  const cached = getCachedResponse(key);
  if (cached) return cached;

  const systemInstruction = `You are a tech support assistant. Provide 3 numbered, actionable steps to fix smart home issues. Keep it brief and encouraging. Use Markdown bolding for key terms.`;
  const userPrompt = `Fix this: ${problemDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text;
    if (text) {
      setCachedResponse(key, text);
      return text;
    }
  } catch (error) {
    console.error("Gemini Request Failed:", error);
  }

  return "Error: Unable to troubleshoot issue.";
};