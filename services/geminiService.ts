import { PlannerFormData } from '../types';

// Frontend service calls Vercel Serverless Function (/api/generate)
// This keeps the DEEPSEEK_API_KEY hidden on the server.

const callApi = async (type: 'plan' | 'compatibility' | 'troubleshoot', data: any): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });

    // Check if response is JSON (Vercel might return HTML for 500/504 errors)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const result = await response.json();

      if (!response.ok) {
        // Return the specific error message from the backend
        throw new Error(result.error || `Server Error: ${response.status}`);
      }

      return result.text || "No response received.";
    } else {
      // Handle non-JSON errors (e.g., Vercel Deployment constraints, Timeouts)
      const text = await response.text();
      throw new Error(`Server Error (${response.status}): ${text.slice(0, 100)}...`);
    }

  } catch (error: any) {
    console.error("Smart Home Hub API Error:", error);
    
    // Provide user-friendly messages for common issues
    if (error.message.includes("API keys configured")) {
      return "System Error: API Keys are missing on the server. Please configure Vercel Environment Variables.";
    }
    if (error.message.includes("404")) {
      return "AI Model Error: The selected AI model was not found. Please check backend configuration.";
    }
    if (error.message.includes("429")) {
      return "Traffic Limit: Too many requests. Please try again in a minute.";
    }

    return `Error: ${error.message || "Unable to communicate with the AI assistant. Please try again later."}`;
  }
};

export const generateSmartHomePlan = async (data: PlannerFormData): Promise<string> => {
  return callApi('plan', data);
};

export const checkDeviceCompatibility = async (deviceA: string, deviceB: string): Promise<string> => {
  return callApi('compatibility', { deviceA, deviceB });
};

export const troubleshootIssue = async (issue: string): Promise<string> => {
  return callApi('troubleshoot', { issue });
};