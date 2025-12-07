import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge', // Optional: Use Edge runtime for faster cold starts, or remove for Node.js
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, data } = await req.json();
    
    // Server-side environment variable
    const apiKey = process.env.API_KEY; 
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error: API Key missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    let model = 'gemini-2.5-flash';
    let systemInstruction = '';
    let userPrompt = '';

    // Logic moved from frontend to backend for security
    switch (type) {
      case 'plan':
        model = 'gemini-3-pro-preview';
        systemInstruction = `You are an expert Smart Home Architect and Systems Integrator. 
Your goal is to generate a comprehensive, affiliate-friendly shopping list and setup guide.
Format the output in clean Markdown.
For every specific product recommendation, create a search link in this format: [Product Name](https://www.amazon.com/s?k=Product+Name+Smart+Home).
Structure:
1. Executive Summary
2. Core Hub/Controller
3. Device Checklist (grouped by room or category) with estimated prices
4. Automation Ideas based on user priorities
5. Installation Tips`;
        userPrompt = `Design a smart home system for a "${data.homeType}" using the "${data.ecosystem}" ecosystem.
Budget: ${data.budget}.
Priorities: ${data.priorities.join(', ')}.
User Skill Level: ${data.skillLevel}.
Please provide specific product recommendations that work natively with ${data.ecosystem} (Matter/Thread support preferred if applicable).`;
        break;

      case 'compatibility':
        model = 'gemini-2.5-flash';
        systemInstruction = `You are a Senior Smart Home Compatibility Engineer.
Determine if two devices/systems work together.
Start with a clear "YES", "NO", or "REQUIRES BRIDGE" in bold.
Then explain the protocol (Zigbee, Z-Wave, WiFi, Thread, Matter) and how to connect them.
If they are incompatible, suggest a workaround (e.g., using Home Assistant or a specific hub).
Format as Markdown.`;
        userPrompt = `Check compatibility between:
Device A: ${data.deviceA}
Device B: ${data.deviceB}`;
        break;

      case 'troubleshoot':
        model = 'gemini-2.5-flash';
        systemInstruction = `You are a helpful Smart Home Tech Support Agent.
Provide a step-by-step troubleshooting guide for the user's issue.
Be empathetic but technical.
Use bolding for key steps.
If hardware might be broken, suggest checking warranty.`;
        userPrompt = `I am experiencing this issue: "${data.issue}". How do I fix it?`;
        break;

      default:
        throw new Error('Invalid request type');
    }

    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: { systemInstruction },
    });

    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to generate content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}