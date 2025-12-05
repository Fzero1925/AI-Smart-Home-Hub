import React, { useState } from 'react';
import { troubleshootIssue } from '../services/geminiService';
import { AdPlaceholder } from './AdPlaceholder';
import { Loader2, Wrench, MessageSquare, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Troubleshoot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSolve = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    const res = await troubleshootIssue(query);
    setResponse(res);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
          <Wrench className="text-red-600" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Smart Home Doctor</h2>
        <p className="text-slate-600 mt-2">Describe your problem, and we'll help you fix it.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
        {/* Chat Area */}
        <div className="flex-1 p-6 bg-slate-50 overflow-y-auto">
          {!response && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
              <MessageSquare size={48} className="mb-4" />
              <p>Examples:</p>
              <ul className="text-sm mt-2 text-center space-y-1">
                <li>"My Hue lights are unreachable in HomeKit"</li>
                <li>"Alexa can't find my new plug"</li>
                <li>"Nest thermostat keeps going offline"</li>
              </ul>
              <div className="mt-8 w-full max-w-xs">
                 <AdPlaceholder format="horizontal" />
              </div>
            </div>
          )}
          
          {loading && (
             <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Wrench className="text-white" size={18} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Loader2 className="animate-spin" size={16} />
                    Diagnosing the issue using Gemini AI...
                  </div>
                </div>
             </div>
          )}

          {response && (
             <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                     <Wrench className="text-white" size={18} />
                  </div>
                  <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 prose prose-slate max-w-none prose-sm">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                </div>
                <AdPlaceholder format="horizontal" className="ml-14" />
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your issue..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-14"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSolve();
                }
              }}
            />
            <button 
              onClick={handleSolve}
              disabled={loading || !query.trim()}
              className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
