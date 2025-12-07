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

    const result = await response.json();

    if (!response.ok) {
      // Return the specific error message from the backend (e.g., "API Key missing")
      throw new Error(result.error || `Server Error: ${response.status}`);
    }

    return result.text || "No response received.";
  } catch (error: any) {
    console.error("Smart Home Hub API Error:", error);
    // Display the actual error message to the user/developer for easier debugging
    return `Error: ${error.message || "Unable to communicate with the AI assistant."}`;
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