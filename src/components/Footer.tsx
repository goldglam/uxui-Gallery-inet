import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAFDFB] dark:bg-[#060B12] text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          
          {/* Brand & Description (Figma Column 1) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3BE29F] to-[#E1FE7D] flex items-center justify-center shadow-md">
                <span className="font-extrabold text-[#202A45] text-xl tracking-tighter">iN</span>
              </div>
              <span className="font-extrabold text-2xl text-[#202A45] dark:text-white tracking-tight">
                INET <span className="text-sm font-normal text-slate-400">GALLERY</span>
              </span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
              Design Resource Hub for UX/UI team projects, design resources, component libraries, and case studies created by our INET UX/UI Team.
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#3BE29F] text-xs font-semibold border border-emerald-200 dark:border-emerald-800/40">
                <span className="w-2 h-2 rounded-full bg-[#3BE29F] animate-pulse" />
                WCAG 2.2 AA Compliant
              </span>
            </div>
          </div>

          {/* Links: Service (Figma Column 2) */}
          <div className="md:col-span-2 col-span-6">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#202A45] dark:text-white mb-4">
              Service
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-[#3BE29F] transition-colors">Categories</a></li>
              <li><a href="#explore" className="hover:text-[#3BE29F] transition-colors">Platform Specs</a></li>
              <li><a href="#moodboard" className="hover:text-[#3BE29F] transition-colors">Design Tokens</a></li>
              <li><a href="#resources" className="hover:text-[#3BE29F] transition-colors">Resources</a></li>
            </ul>
          </div>

          {/* Links: Company (Figma Column 3) */}
          <div className="md:col-span-2 col-span-6">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#202A45] dark:text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-[#3BE29F] transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-[#3BE29F] transition-colors">Our Team</a></li>
              <li><a href="#faqs" className="hover:text-[#3BE29F] transition-colors">FAQs</a></li>
              <li><a href="#guidelines" className="hover:text-[#3BE29F] transition-colors">Design System</a></li>
            </ul>
          </div>

          {/* Contact (Figma Column 4) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#202A45] dark:text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#3BE29F]" />
                <span className="font-mono text-xs">(+66) 71-440-6584</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#3BE29F]" />
                <span className="text-xs">uxui-team@inet.co.th</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#3BE29F] flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">INET Tower, Bangkok, Thailand</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 INET UX/UI Team. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with React & Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#3BE29F] hover:text-black transition-colors"
              title="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
