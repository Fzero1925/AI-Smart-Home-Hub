import React, { useState } from 'react';
import { checkDeviceCompatibility } from '../services/geminiService';
import { AdPlaceholder } from './AdPlaceholder';
import { Loader2, Link as LinkIcon, AlertTriangle, CheckCircle, XCircle, Search, TrendingUp, Info, Zap, Globe, Share2 } from 'lucide-react';
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
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Compatibility Checker</h2>
        <p className="text-slate-600 mt-2">Will it work? Find out before you buy.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 mb-8">
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
            {/* Ad Unit inside results */}
            <div className="mt-6">
              <AdPlaceholder format="horizontal" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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

        <div className="flex flex-col gap-4">
           <AdPlaceholder format="rectangle" className="h-full bg-white" />
        </div>
      </div>

      {/* Educational Content for SEO */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <Info className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-slate-900">Understanding Smart Home Protocols</h3>
        </div>
        <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed">
            <p className="mb-6">
              When checking compatibility, success usually depends on the communication layer. Devices don't just "talk" to each other magically; they need a common language.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="text-amber-500" size={20} />
                      <strong className="block text-slate-900">Zigbee & Z-Wave</strong>
                    </div>
                    <p>
                      These are low-power mesh networks. They create a web where every plugged-in device extends the signal. They <strong>require a hub</strong> (like a Hue Bridge or SmartThings Hub) to translate their signals into something your phone understands.
                    </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="text-blue-500" size={20} />
                      <strong className="block text-slate-900">Wi-Fi Devices</strong>
                    </div>
                    <p>
                      These connect directly to your router. They are easy to set up (no hub needed) but consume more power and can slow down your internet if you have too many (e.g., 50+ bulbs). Ideal for plugs and cameras.
                    </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Share2 className="text-indigo-500" size={20} />
                      <strong className="block text-slate-900">Matter & Thread</strong>
                    </div>
                    <p>
                      <strong>Matter</strong> is the new universal language. If a device has the Matter logo, it works with Apple, Google, and Alexa out of the box. <strong>Thread</strong> is the wireless radio technology that makes Matter fast and reliable.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};