import React, { useState } from 'react';
import { checkDeviceCompatibility } from '../services/geminiService';
import { Loader2, Link as LinkIcon, AlertTriangle, CheckCircle, XCircle, Search, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Compatibility: React.FC = () => {
  const [deviceA, setDeviceA] = useState('');
  const [deviceB, setDeviceB] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!deviceA || !deviceB) return;
    setLoading(true);
    setResult(null);
    const response = await checkDeviceCompatibility(deviceA, deviceB);
    setResult(response);
    setLoading(false);
  };

  const loadPreset = (a: string, b: string) => {
    setDeviceA(a);
    setDeviceB(b);
    // Automatically trigger check slightly after setting state would require useEffect, 
    // but for simplicity we just set values. User clicks check.
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Compatibility Checker</h2>
        <p className="text-slate-600 mt-2">Will it work? Find out before you buy.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 mb-12">
        <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="p-8">
          <form onSubmit={handleCheck} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Device / System 1</label>
              <input 
                type="text"
                placeholder="e.g. Nest Thermostat"
                className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={deviceA}
                onChange={(e) => setDeviceA(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-center pb-4 text-slate-400">
              <LinkIcon size={24} />
            </div>

            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Device / System 2</label>
              <input 
                type="text"
                placeholder="e.g. Apple HomeKit"
                className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={deviceB}
                onChange={(e) => setDeviceB(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !deviceA || !deviceB}
              className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Check Now'}
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-slate-50 border-t border-slate-200 p-8">
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown 
                components={{
                  a: ({node, ...props}) => (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 font-bold hover:underline bg-blue-50 px-1 rounded border border-blue-100"
                    >
                      {props.children} ↗
                    </a>
                  )
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Popular Presets - Good for Engagement & "Static" content feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
             <TrendingUp size={18} className="text-blue-500"/>
             Popular Comparisons
           </h3>
           <div className="space-y-3">
             {[
               ['Philips Hue', 'Apple HomeKit'],
               ['Ring Doorbell', 'Google Home'],
               ['Aqara Sensors', 'Amazon Alexa'],
               ['Sonos Speakers', 'Home Assistant']
             ].map(([a, b], idx) => (
               <button 
                 key={idx}
                 onClick={() => loadPreset(a, b)}
                 className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm group"
               >
                 <span>{a} + {b}</span>
                 <Search size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
             ))}
           </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">Why check compatibility?</h3>
          <p className="text-sm text-blue-800 mb-4">
            Smart home standards (Matter, Zigbee, Z-Wave) are confusing. Buying the wrong device means it won't connect to your hub.
          </p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-white rounded-md text-slate-600 border border-blue-100">Matter Ready</span>
            <span className="px-2 py-1 bg-white rounded-md text-slate-600 border border-blue-100">Zigbee 3.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};