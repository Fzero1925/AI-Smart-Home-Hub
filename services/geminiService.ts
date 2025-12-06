import { GoogleGenAI } from "@google/genai";
import { PlannerFormData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to AI service. Please try again later.";
  }
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to AI service. Please try again later.";
  }
};

export const troubleshootIssue = async (issue: string): Promise<string> => {
  const systemInstruction = `You are a helpful Smart Home Tech Support Agent.
Provide a step-by-step troubleshooting guide for the user's issue.
Be empathetic but technical.
Use bolding for key steps.
If hardware might be broken, suggest checking warranty.`;

  const userPrompt = `I am experiencing this issue: "${issue}". How do I fix it?`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to AI service. Please try again later.";
  }
};