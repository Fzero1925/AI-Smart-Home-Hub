import React from 'react';
import { Bot, Zap, ShieldCheck, LayoutTemplate, Sun, Moon, Tv, HelpCircle, ChevronDown } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Build Your <span className="text-blue-600">Dream Smart Home</span>
            <br />Without the Confusion.
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
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
      </div>

      {/* Feature Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* SEO Section: What is AI SmartHome Hub? */}
      <div className="w-full bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What is AI SmartHome Hub?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            AI SmartHome Hub is your free, intelligent assistant dedicated to simplifying home automation. 
            The smart home market is flooded with thousands of devices from brands like Philips Hue, Sonos, Aqara, and Nest. 
            Without guidance, it's easy to buy incompatible products or struggle with unreliable connections.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            We use advanced Artificial Intelligence (Gemini & DeepSeek) to analyze protocols, specifications, and user manuals instantly. 
            Whether you are building a new smart home from scratch or fixing a broken automation, our tools provide clear, data-driven solutions.
          </p>
        </div>
      </div>

      {/* Scenarios Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Inspiration: What Can Your Home Do?</h2>
          <p className="text-slate-600 mt-2">Discover popular automation scenarios our planner can help you build.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-amber-300 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-full group-hover:scale-110 transition-transform">
                <Sun size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">"Good Morning"</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Your shades slowly rise to let in natural light, the thermostat warms the bathroom floor, and your smart speaker reads the news while the coffee maker starts brewing—all automatically at 7:00 AM.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                <Moon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">"Good Night"</h3>
            </div>
            <p className="text-slate-600 text-sm">
              One voice command locks all doors, arms the security system, turns off all lights, and sets the thermostat to a cool sleeping temperature. Peace of mind, instantly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-purple-300 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full group-hover:scale-110 transition-transform">
                <Tv size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">"Movie Mode"</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Dim the lights to 20%, close the blackout curtains, and turn on the TV and soundbar. The perfect cinematic atmosphere without leaving the couch.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full bg-white py-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                <HelpCircle size={20} className="text-blue-500" />
                Is this service free?
              </h3>
              <p className="text-slate-600">
                Yes! AI SmartHome Hub is 100% free to use. We are supported by ads and affiliate links to products we recommend.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                <HelpCircle size={20} className="text-blue-500" />
                Do I need a Smart Hub?
              </h3>
              <p className="text-slate-600">
                It depends. If you use Wi-Fi devices, you might not need one. However, for a reliable home with 30+ devices, we recommend using a Hub (like Apple HomePod, SmartThings, or Habitat) to keep devices offline and responsive.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                <HelpCircle size={20} className="text-blue-500" />
                Can I mix Alexa and Google Home?
              </h3>
              <p className="text-slate-600">
                Technically yes, but it can be confusing. We recommend choosing one "primary" voice assistant for the whole house to keep things simple for your family.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};