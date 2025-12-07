export enum ViewState {
  HOME = 'HOME',
  PLANNER = 'PLANNER',
  COMPATIBILITY = 'COMPATIBILITY',
  TROUBLESHOOT = 'TROUBLESHOOT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
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