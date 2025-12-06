import React, { useState } from 'react';
import { generateSmartHomePlan } from '../services/geminiService';
import { PlannerFormData } from '../types';
import { AdPlaceholder } from './AdPlaceholder';
import ReactMarkdown from 'react-markdown';
import { Loader2, ArrowRight, Home, DollarSign, Cpu, ShoppingBag } from 'lucide-react';

export const Planner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<PlannerFormData>({
    homeType: '2-Bedroom Apartment',
    ecosystem: 'Apple HomeKit',
    budget: '$500 - $1000',
    priorities: [],
    skillLevel: 'Beginner'
  });

  const togglePriority = (priority: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.priorities.length === 0) {
      alert("Please select at least one priority.");
      return;
    }
    setLoading(true);
    setResult(null);
    const plan = await generateSmartHomePlan(formData);
    setResult(plan);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      
      {/* Input Form */}
      <div className="lg:w-1/3 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Home className="text-blue-600" />
            Home Profile
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">My Living Space</label>
              <select 
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.homeType}
                onChange={(e) => setFormData({...formData, homeType: e.target.value})}
              >
                <option>Studio Apartment</option>
                <option>1-Bedroom Apartment</option>
                <option>2-Bedroom Apartment</option>
                <option>Single Family Home (Small)</option>
                <option>Multi-story House</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Ecosystem</label>
              <div className="grid grid-cols-3 gap-2">
                {['Apple HomeKit', 'Google Home', 'Amazon Alexa'].map(eco => (
                  <button
                    key={eco}
                    type="button"
                    onClick={() => setFormData({...formData, ecosystem: eco})}
                    className={`p-2 text-sm rounded-lg border ${
                      formData.ecosystem === eco 
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {eco}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range</label>
              <select 
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              >
                <option>Under $300 (Essentials)</option>
                <option>$300 - $800 (Solid Start)</option>
                <option>$800 - $2000 (Advanced)</option>
                <option>$2000+ (Full Home)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priorities (Pick multiple)</label>
              <div className="flex flex-wrap gap-2">
                {['Lighting', 'Security', 'Energy Saving', 'Entertainment', 'Climate', 'Elderly Care'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePriority(p)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      formData.priorities.includes(p)
                      ? 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-500'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

             <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tech Skill Level</label>
              <input 
                type="range" 
                min="0" max="2" 
                step="1"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  const levels = ['Beginner', 'Intermediate', 'Expert'];
                  setFormData({...formData, skillLevel: levels[val]});
                }}
              />
              <div className="text-right text-sm text-slate-500 mt-1">{formData.skillLevel}</div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Cpu />}
              Generate Plan
            </button>
          </form>
          
          {/* Ad Unit: Sidebar */}
          <div className="mt-8">
            <AdPlaceholder format="rectangle" />
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="lg:w-2/3">
        {loading && (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8 text-center animate-pulse">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-800">Consulting AI Architect...</h3>
            <p className="text-slate-500 mt-2">Gemini is analyzing {formData.ecosystem} compatibility.</p>
          </div>
        )}

        {!loading && !result && (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ArrowRight className="text-blue-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Ready to design</h3>
            <p className="text-slate-500 mt-2 max-w-sm">
              Fill out the profile on the left and our AI will build a custom smart home roadmap for you.
            </p>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-6">
             <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 overflow-hidden">
                <div className="prose prose-slate prose-blue max-w-none">
                    <ReactMarkdown 
                      components={{
                        a: ({node, ...props}) => (
                          <a 
                            {...props} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-blue-600 font-bold no-underline hover:text-blue-800 border-b-2 border-blue-100 hover:border-blue-500 transition-all"
                          >
                            <ShoppingBag size={14} className="inline mb-1" />
                            {props.children}
                          </a>
                        )
                      }}
                    >
                      {result}
                    </ReactMarkdown>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
                  * Prices are estimates. Links take you to Amazon search.
                </div>
             </div>
             
             {/* Ad Unit: Bottom of Content */}
             <AdPlaceholder format="horizontal" />
          </div>
        )}
      </div>
    </div>
  );
};