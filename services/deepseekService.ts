import { PlannerFormData } from '../types';

// Service deprecated in favor of geminiService.ts
// import.meta.env removed to fix type error

export const generateSmartHomePlan = async (data: PlannerFormData): Promise<string> => {
  return "Service deprecated. Please update imports to use geminiService.";
};

export const checkDeviceCompatibility = async (deviceA: string, deviceB: string): Promise<string> => {
  return "Service deprecated. Please update imports to use geminiService.";
};

export const troubleshootIssue = async (issue: string): Promise<string> => {
  return "Service deprecated. Please update imports to use geminiService.";
};