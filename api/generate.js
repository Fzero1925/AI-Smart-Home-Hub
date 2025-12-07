
export const config = {
  runtime: 'edge',
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
    
    // 1. Check for API Keys
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!googleApiKey && !deepseekApiKey) {
      return new Response(JSON.stringify({ error: 'Server Configuration Error: No API keys configured (GOOGLE_API_KEY or DEEPSEEK_API_KEY) in Vercel Settings.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Prepare System Instructions & User Prompts
    let systemInstructionText = '';
    let userPrompt = '';

    switch (type) {
      case 'plan':
        systemInstructionText = `You are an expert Smart Home Architect. Generate a comprehensive shopping list and setup guide. 
        Format output in Markdown. 
        For product recommendations, create Amazon search links like this: [Product Name](https://www.amazon.com/s?k=Product+Name+Smart+Home).`;
        userPrompt = `Design a smart home for a "${data.homeType}" using "${data.ecosystem}". 
        Budget: ${data.budget}. Priorities: ${data.priorities.join(', ')}. Skill Level: ${data.skillLevel}.`;
        break;

      case 'compatibility':
        systemInstructionText = `You are a Smart Home Compatibility Engineer. 
        Start with "YES", "NO", or "REQUIRES BRIDGE" in bold. Explain the protocols (Zigbee, Matter, etc.).`;
        userPrompt = `Check compatibility between: ${data.deviceA} and ${data.deviceB}.`;
        break;

      case 'troubleshoot':
        systemInstructionText = `You are a Technical Support Agent. Provide step-by-step troubleshooting.`;
        userPrompt = `Issue: "${data.issue}". How do I fix it?`;
        break;
      
      default:
        return new Response(JSON.stringify({ error: 'Invalid request type' }), { status: 400 });
    }

    let resultText = "";

    // ---------------------------------------------------------
    // STRATEGY A: Google Gemini (Preferred if Key exists)
    // ---------------------------------------------------------
    if (googleApiKey) {
      // Using gemini-2.5-flash-lite as requested
      const modelName = 'gemini-2.5-flash-lite';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${googleApiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          },
          contents: [{
            parts: [{ text: userPrompt }]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        // Return raw Google error for debugging
        throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
      }

      const json = await response.json();
      resultText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    } 
    
    // ---------------------------------------------------------
    // STRATEGY B: DeepSeek (Fallback)
    // ---------------------------------------------------------
    else if (deepseekApiKey) {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${deepseekApiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemInstructionText },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DeepSeek API Error (${response.status}): ${errorText}`);
      }

      const json = await response.json();
      resultText = json.choices?.[0]?.message?.content;
    }

    // ---------------------------------------------------------
    // Final Output
    // ---------------------------------------------------------
    if (!resultText) {
      return new Response(JSON.stringify({ text: "AI returned an empty response. Please try again." }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ text: resultText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Backend API Error:", error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
