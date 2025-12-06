import React, { useState } from 'react';
import { troubleshootIssue } from '../services/geminiService';
import { AdPlaceholder } from './AdPlaceholder';
import { Loader2, Wrench, MessageSquare, Send, ShoppingBag, CheckCircle2, Sparkles } from 'lucide-react';
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

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
        {/* Chat Area */}
        <div className="flex-1 p-6 bg-slate-50/50 overflow-y-auto">
          {!response && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
              <MessageSquare size={48} className="mb-4" />
              <p className="font-medium text-slate-500">How can I help you today?</p>
              <ul className="text-sm mt-4 text-center space-y-2">
                <li className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 hover:text-blue-600 transition-colors" onClick={() => setQuery("My Hue lights are unreachable")}>"My Hue lights are unreachable"</li>
                <li className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 hover:text-blue-600 transition-colors" onClick={() => setQuery("Alexa can't find my new plug")}>"Alexa can't find my new plug"</li>
                <li className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 hover:text-blue-600 transition-colors" onClick={() => setQuery("Nest thermostat offline")}>"Nest thermostat offline"</li>
              </ul>
              <div className="mt-12 w-full max-w-xs opacity-50">
                 <AdPlaceholder format="horizontal" />
              </div>
            </div>
          )}
          
          {loading && (
             <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Wrench className="text-white" size={18} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Loader2 className="animate-spin text-blue-500" size={20} />
                    <span className="font-medium">Diagnosing issue with Gemini AI...</span>
                  </div>
                </div>
             </div>
          )}

          {response && (
             <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-indigo-100">
                     <Sparkles className="text-white" size={20} />
                  </div>
                  
                  {/* AI Response Card - Distinct Styling */}
                  <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl rounded-tl-none shadow-md border border-indigo-100 prose prose-slate max-w-none group w-full relative">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Wrench size={48} className="text-indigo-900"/>
                    </div>
                    <ReactMarkdown
                      components={{
                        a: ({node, ...props}) => (
                          <a 
                            {...props} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-indigo-600 font-bold no-underline hover:text-indigo-800 border-b-2 border-indigo-100 hover:border-indigo-500 transition-all bg-white px-2 py-0.5 rounded-md mx-1 shadow-sm hover:shadow-md"
                          >
                            <ShoppingBag size={14} className="inline mb-1" />
                            {props.children}
                          </a>
                        ),
                        strong: ({node, ...props}) => <strong className="text-indigo-900 font-bold" {...props} />,
                        h1: ({node, ...props}) => <h3 className="text-lg font-bold text-indigo-900 mt-0" {...props} />,
                        h2: ({node, ...props}) => <h4 className="text-md font-bold text-slate-800" {...props} />,
                        li: ({node, ...props}) => <li className="marker:text-indigo-500" {...props} />
                      }}
                    >
                      {response}
                    </ReactMarkdown>
                  </div>
                </div>
                
                <div className="pl-14">
                  <AdPlaceholder format="horizontal" className="shadow-sm bg-white" />
                </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="relative max-w-4xl mx-auto">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your issue (e.g., 'My Ecobee thermostat screen is blank')..."
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none resize-none h-16 shadow-inner transition-all text-slate-700"
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
              className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
            >
              <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            AI can make mistakes. Always check official manuals before modifying electrical wiring.
          </p>
        </div>
      </div>
    </div>
  );
};