// NOTE: This service is deprecated. Switched back to Gemini API (services/geminiService.ts).
// The code below is commented out to prevent TypeScript errors.

/*
import { PlannerFormData } from '../types';

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/chat/completions';

const callDeepSeek = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  if (!API_KEY) {
    console.error("Missing VITE_DEEPSEEK_API_KEY");
    return "Configuration Error: API Key is missing. Please add VITE_DEEPSEEK_API_KEY to your Vercel environment variables.";
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: false,
        temperature: 1.0
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("DeepSeek API Error Response:", errorData);
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("DeepSeek Service Error:", error);
    return "Error: Unable to connect to AI service. Please check your network or try again later.";
  }
};

export const generateSmartHomePlan = async (data: PlannerFormData): Promise<string> => {
  const systemInstruction = `You are an expert Smart Home Architect and Systems Integrator. 
Your goal is to generate a comprehensive, affiliate-friendly shopping list and setup guide.
Format the output in clean Markdown.
For every specific product recommendation, create a search link in this format: [Product Name](https://www.amazon.com/s?k=Product+Name+Smart+Home).
Structure:
1. Executive Summary
2. Core Hub/Controller
3. Device Checklist (grouped by room or category) with estimated prices
4. Automation Ideas based on user priorities
5. Installation Tips`;

  const userPrompt = `Design a smart home system for a "${data.homeType}" using the "${data.ecosystem}" ecosystem.
Budget: ${data.budget}.
Priorities: ${data.priorities.join(', ')}.
User Skill Level: ${data.skillLevel}.
Please provide specific product recommendations that work natively with ${data.ecosystem} (Matter/Thread support preferred if applicable).`;

  return callDeepSeek(systemInstruction, userPrompt);
};

export const checkDeviceCompatibility = async (deviceA: string, deviceB: string): Promise<string> => {
  const systemInstruction = `You are a Senior Smart Home Compatibility Engineer.
Determine if two devices/systems work together.
Start with a clear "YES", "NO", or "REQUIRES BRIDGE" in bold.
Then explain the protocol (Zigbee, Z-Wave, WiFi, Thread, Matter) and how to connect them.
If they are incompatible, suggest a workaround (e.g., using Home Assistant or a specific hub).
Format as Markdown.`;

  const userPrompt = `Check compatibility between:
Device A: ${deviceA}
Device B: ${deviceB}`;

  return callDeepSeek(systemInstruction, userPrompt);
};

export const troubleshootIssue = async (issue: string): Promise<string> => {
  const systemInstruction = `You are a helpful Smart Home Tech Support Agent.
Provide a step-by-step troubleshooting guide for the user's issue.
Be empathetic but technical.
Use bolding for key steps.
If hardware might be broken, suggest checking warranty.`;

  const userPrompt = `I am experiencing this issue: "${issue}". How do I fix it?`;

  return callDeepSeek(systemInstruction, userPrompt);
};
*/

export const generateSmartHomePlan = async (data: any): Promise<string> => { throw new Error("Deprecated"); };
export const checkDeviceCompatibility = async (deviceA: string, deviceB: string): Promise<string> => { throw new Error("Deprecated"); };
export const troubleshootIssue = async (issue: string): Promise<string> => { throw new Error("Deprecated"); };