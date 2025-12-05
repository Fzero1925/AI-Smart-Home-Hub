import React from 'react';

interface AdPlaceholderProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ format = 'auto', className = '' }) => {
  // In production, this is where you would paste the <ins> code from Google AdSense.
  // For development, we show a placeholder to design the layout around the ads.
  return (
    <div className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 text-xs uppercase tracking-wider overflow-hidden ${className}`}
         style={{ minHeight: format === 'rectangle' ? '250px' : '100px' }}>
      <span className="mb-1">AdSpace</span>
      <span className="text-[10px] opacity-70">Google AdSense</span>
    </div>
  );
};