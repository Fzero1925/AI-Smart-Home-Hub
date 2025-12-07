import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={32} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Have a question, feedback, or a partnership inquiry? We'd love to hear from you. 
          While we primarily use AI to answer technical questions, our team is here for everything else.
        </p>

        <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 inline-block w-full max-w-md">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Email Support</h3>
          <p className="text-slate-500 mb-6">For general inquiries and ad placements:</p>
          
          <a 
            href="mailto:aismarthomehub@gmail.com.cn" 
            className="flex items-center justify-center gap-3 px-6 py-3 bg-white border border-slate-300 rounded-lg shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all text-slate-700 font-medium group"
          >
            <Mail size={20} className="group-hover:scale-110 transition-transform" />
            aismarthomehub@gmail.com.cn
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-400">
          <p>
            Response Time: We aim to respond to all legitimate inquiries within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
};