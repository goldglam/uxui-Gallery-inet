import React from 'react';
import { Sparkles, Send, ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onRequestClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onRequestClick }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0B111B] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container with Figma Vibrant Lime/Yellow Theme */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E1FE7D] via-[#ddff80] to-[#c2e857] p-8 sm:p-12 lg:p-16 text-center shadow-xl shadow-[#E1FE7D]/20">
          
          {/* Subtle geometric circles in background */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#3BE29F]/30 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Top pill */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#202A45]/10 text-[#202A45] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>Collaborate with INET UX/UI Team</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-5xl font-black text-[#202A45] tracking-tight mb-5 leading-tight">
              Have a project in mind?
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#202A45]/85 font-medium mb-8 leading-relaxed max-w-2xl mx-auto">
              Share your ideas with our UX/UI team. Submit your request and let us help turn your requirements into user-centered digital experiences and standardized design systems.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onRequestClick}
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#202A45] hover:bg-[#151C30] text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 transform hover:-translate-y-1"
              >
                <span>Send Request</span>
                <Send size={18} className="text-[#3BE29F]" />
              </button>
              
              <a
                href="#features"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/60 hover:bg-white text-[#202A45] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Browse Component Guidelines</span>
                <ArrowRight size={16} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
