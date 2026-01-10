'use client';

import React from 'react';
import { ExternalLink, CheckCircle2, X } from 'lucide-react';

interface SuccessPopupProps {
  prUrl: string;
  onClose: () => void;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({ prUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-zinc-900 border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-cyan-500/10 rounded-full">
              <CheckCircle2 size={48} className="text-cyan-400" />
            </div>
          </div>
          
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Contribution Submitted!</h3>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            Your feedback has been packaged into a Pull Request. Once reviewed and merged by the Clevertree team, it will appear permanently in the project records.
          </p>

          <div className="space-y-3">
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-cyan-900/20"
            >
              View Pull Request <ExternalLink size={16} />
            </a>
            
            <button
              onClick={onClose}
              className="w-full py-3 px-6 text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        
        <div className="bg-black/50 py-3 px-6 border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Protocol: Community Sync</span>
          <span className="text-[10px] text-cyan-900 font-mono">Verified via GitHub API</span>
        </div>
      </div>
    </div>
  );
};
