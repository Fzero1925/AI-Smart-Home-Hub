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
    
    // Read the DEEPSEEK_API_KEY from Vercel Environment Variables
    const apiKey = process.env.DEEPSEEK_API_KEY; 
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server Error: DEEPSEEK_API_KEY is missing in Vercel settings.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Construct the prompt based on the user's request type
    let systemInstruction = '';
    let userPrompt = '';

    switch (type) {
      case 'plan':
        systemInstruction = `You are an expert Smart Home Architect. Generate a comprehensive shopping list and setup guide. 
        Format output in Markdown. 
        For product recommendations, create Amazon search links like this: [Product Name](https://www.amazon.com/s?k=Product+Name+Smart+Home).`;
        userPrompt = `Design a smart home for a "${data.homeType}" using "${data.ecosystem}". 
        Budget: ${data.budget}. Priorities: ${data.priorities.join(', ')}. Skill Level: ${data.skillLevel}.`;
        break;

      case 'compatibility':
        systemInstruction = `You are a Smart Home Compatibility Engineer. 
        Start with "YES", "NO", or "REQUIRES BRIDGE" in bold. Explain the protocols (Zigbee, Matter, etc.).`;
        userPrompt = `Check compatibility between: ${data.deviceA} and ${data.deviceB}.`;
        break;

      case 'troubleshoot':
        systemInstruction = `You are a Technical Support Agent. Provide step-by-step troubleshooting.`;
        userPrompt = `Issue: "${data.issue}". How do I fix it?`;
        break;
      
      default:
        return new Response(JSON.stringify({ error: 'Invalid type' }), { status: 400 });
    }

    // Call DeepSeek API (OpenAI Compatible Interface)
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
    }

    const json = await response.json();
    const text = json.choices?.[0]?.message?.content || "No response generated.";

    return new Response(JSON.stringify({ text }), {
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