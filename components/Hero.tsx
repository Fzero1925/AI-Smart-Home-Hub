import React from 'react';
import { Bot, Zap, ShieldCheck, LayoutTemplate } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Build Your <span className="text-blue-600">Dream Smart Home</span>
          <br />Without the Confusion.
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
          Don't guess what works together. Our AI Architect designs your perfect ecosystem, checks device compatibility, and solves your tech headaches instantly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => onNavigate(ViewState.PLANNER)}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all transform hover:-translate-y-1 text-lg flex items-center gap-2"
          >
            <Bot size={24} />
            Generate My Home Plan
          </button>
          <button 
             onClick={() => onNavigate(ViewState.COMPATIBILITY)}
            className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all text-lg flex items-center gap-2"
          >
            <ShieldCheck size={24} />
            Check Compatibility
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
            <LayoutTemplate className="text-blue-600" size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Blueprints</h3>
          <p className="text-slate-600">
            Tell us about your home and budget. We'll generate a complete shopping list and setup guide tailored to Apple, Google, or Alexa.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
            <Zap className="text-indigo-600" size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Matter & Zigbee Expert</h3>
          <p className="text-slate-600">
            Confused by protocols? We analyze device specs to ensure your light bulbs actually talk to your switches before you buy.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
            <Bot className="text-emerald-600" size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Troubleshooting</h3>
          <p className="text-slate-600">
            "No Response"? "Device Offline"? Our AI diagnoses connection issues and guides you through the fix step-by-step.
          </p>
        </div>
      </div>
    </div>
  );
};