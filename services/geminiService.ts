import { PlannerFormData } from "../types";

// Configuration for DeepSeek (or OpenAI)
// Get your key from: https://platform.deepseek.com/
const API_KEY = process.env.VITE_DEEPSEEK_API_KEY || process.env.API_KEY || ''; 
const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL_NAME = "deepseek-chat"; // V3 Model

// Helper for standard OpenAI-compatible fetch
const callAI = async (systemPrompt: string, userPrompt: string, temperature = 0.7) => {
  if (!API_KEY) {
    return "Error: API Key is missing. Please set VITE_DEEPSEEK_API_KEY in your Vercel project settings.";
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: temperature,
        stream: false
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("AI API Error:", err);
      return `Error: ${err.error?.message || 'API Request Failed'}`;
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Network Error:", error);
    return "Network error. Please check your connection.";
  }
};

// --- CACHING UTILITIES (Crucial for cost saving) ---
const getCachedResponse = (key: string): string | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) return cached;
  } catch (e) { console.warn("Cache read error", e); }
  return null;
};

const setCachedResponse = (key: string, value: string) => {
  try {
    // Limit cache size roughly
    if (localStorage.length > 50) localStorage.clear();
    localStorage.setItem(key, value);
  } catch (e) { console.warn("Cache write error", e); }
};

const generateCacheKey = (prefix: string, data: any) => `${prefix}_${JSON.stringify(data)}`;

// --- EXPORTED FUNCTIONS ---

export const generateSmartHomePlan = async (data: PlannerFormData): Promise<string> => {
  const cacheKey = generateCacheKey('plan_ds', data);
  const cached = getCachedResponse(cacheKey);
  if (cached) return cached;

  const prioritiesStr = data.priorities.join(", ");
  const systemPrompt = `You are an expert Smart Home Consultant. Your goal is to provide a helpful, structured buying guide. 
  
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

  const text = await callAI(systemPrompt, userPrompt);
  setCachedResponse(cacheKey, text);
  return text;
};

export const checkDeviceCompatibility = async (deviceA: string, deviceB: string): Promise<string> => {
  const key = generateCacheKey('comp_ds', { a: deviceA.toLowerCase().trim(), b: deviceB.toLowerCase().trim() });
  const cached = getCachedResponse(key);
  if (cached) return cached;

  const systemPrompt = `You are a strict technical compatibility checker. 
  Answer starts with: **YES**, **NO**, or **REQUIRES BRIDGE**.
  Then explain protocol details (Zigbee/Matter/Thread) in 2 sentences.
  If NO, suggest a bridge with an Amazon link: [Bridge Name](https://www.amazon.com/s?k=Bridge+Name).`;

  const text = await callAI(systemPrompt, `Check compatibility between ${deviceA} and ${deviceB}.`);
  setCachedResponse(key, text);
  return text;
};

export const troubleshootIssue = async (problemDescription: string): Promise<string> => {
  const key = generateCacheKey('fix_ds', problemDescription.toLowerCase().trim());
  const cached = getCachedResponse(key);
  if (cached) return cached;

  const systemPrompt = `You are a tech support assistant. Provide 3 numbered, actionable steps to fix smart home issues. Keep it brief.`;
  
  const text = await callAI(systemPrompt, `Fix this: ${problemDescription}`);
  setCachedResponse(key, text);
  return text;
};