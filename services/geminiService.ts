import { GoogleGenAI } from "@google/genai";
import { PlannerFormData } from "../types";

// --- CONFIGURATION ---
// Set this to TRUE to use Google Gemini.
// Set this to FALSE to use DeepSeek (Current default for cost saving).
const USE_GEMINI = false;

// --- GOOGLE GEMINI SETUP ---
// Even if unused, we initialize it to ensure type safety and build validity.
// The key comes from process.env.API_KEY (mapped in vite.config.ts).
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- DEEPSEEK SETUP ---
const DEEPSEEK_API_KEY = (import.meta as any).env?.VITE_DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

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

// --- HELPER: DEEPSEEK FETCH ---
const callDeepSeek = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("DeepSeek Service Error:", error);
    return "Error: Unable to connect to DeepSeek AI service. Please check your API Key configuration.";
  }
};

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

  let text = "";

  if (USE_GEMINI) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction: systemInstruction }
      });
      text = response.text || "No response generated.";
    } catch (error) {
       console.error("Gemini Error:", error);
       text = "Error: Gemini API failed. Please check configuration.";
    }
  } else {
    text = await callDeepSeek(systemInstruction, userPrompt);
  }

  if (!text.startsWith("Error:")) setCachedResponse(cacheKey, text);
  return text;
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

  let text = "";

  if (USE_GEMINI) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction: systemInstruction }
      });
      text = response.text || "No response generated.";
    } catch (error) {
       console.error("Gemini Error:", error);
       text = "Error: Gemini API failed. Please check configuration.";
    }
  } else {
    text = await callDeepSeek(systemInstruction, userPrompt);
  }

  if (!text.startsWith("Error:")) setCachedResponse(key, text);
  return text;
};

export const troubleshootIssue = async (problemDescription: string): Promise<string> => {
  const key = generateCacheKey('fix', problemDescription.toLowerCase().trim());
  const cached = getCachedResponse(key);
  if (cached) return cached;

  const systemInstruction = `You are a tech support assistant. Provide 3 numbered, actionable steps to fix smart home issues. Keep it brief.`;
  const userPrompt = `Fix this: ${problemDescription}`;

  let text = "";

  if (USE_GEMINI) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction: systemInstruction }
      });
      text = response.text || "No response generated.";
    } catch (error) {
       console.error("Gemini Error:", error);
       text = "Error: Gemini API failed. Please check configuration.";
    }
  } else {
    text = await callDeepSeek(systemInstruction, userPrompt);
  }

  if (!text.startsWith("Error:")) setCachedResponse(key, text);
  return text;
};