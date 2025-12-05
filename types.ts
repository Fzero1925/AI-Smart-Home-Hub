export enum ViewState {
  HOME = 'HOME',
  PLANNER = 'PLANNER',
  COMPATIBILITY = 'COMPATIBILITY',
  TROUBLESHOOT = 'TROUBLESHOOT'
}

export interface PlannerFormData {
  homeType: string;
  ecosystem: string;
  budget: string;
  priorities: string[];
  skillLevel: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
