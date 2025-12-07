import { PlannerFormData } from '../types';

// Frontend service now calls the Vercel Serverless Function (/api/generate)
// This keeps the API Key hidden on the server.

const callApi = async (type: 'plan' | 'compatibility' | 'troubleshoot', data: any): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.text || "No response received.";
  } catch (error) {
    console.error("Smart Home Hub API Error:", error);
    return "Error: Unable to communicate with the AI assistant. Please try again.";
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
