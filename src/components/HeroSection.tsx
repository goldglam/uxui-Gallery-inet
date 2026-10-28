import React from 'react';
import { Search, ArrowRight, Sparkles, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { Project } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: readonly string[];
  featuredProjects: Project[];
  onSelectProject: (p: Project) => void;
  onSearchSubmit?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  featuredProjects,
  onSelectProject,
  onSearchSubmit,
}) => {
  const centerProject = featuredProjects.find(p => p.id === 'medicare') || featuredProjects[0];
  const leftProject = featuredProjects.find(p => p.id === 'harvesta') || featuredProjects[1];
  const rightProject = featuredProjects.find(p => p.id === 'finflow') || featuredProjects[2];

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32 bg-gradient-to-b from-[#F2FBF7] via-[#FAFDFB] to-white dark:from-[#08101C] dark:via-[#0B1422] dark:to-[#0B111B] transition-colors duration-200">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-r from-[#3BE29F]/15 via-[#E1FE7D]/15 to-[#3BE29F]/10 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-800/50 shadow-sm mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-[#3BE29F] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            INET Internal UX/UI Hub 2026
          </span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-xs font-medium text-emerald-700 dark:text-[#3BE29F] flex items-center gap-1">
            Production Guidelines & Case Studies
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202A45] dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          Explore{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#3BE29F]">
            UX/UI Projects
            <span className="absolute left-0 bottom-1 w-full h-3 bg-[#E1FE7D]/60 dark:bg-[#E1FE7D]/30 -z-10 rounded-sm" />
          </span>{' '}
          in One Place
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Browse case studies, design systems, research, and UI inspirations created by our INET UX/UI team for cross-team guidance and architectural standard.
        </p>

        {/* Search Bar Container */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative flex items-center bg-white dark:bg-[#131C2B] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200/80 dark:border-slate-700/80 p-2 sm:p-2.5 transition-all focus-within:ring-2 focus-within:ring-[#3BE29F]/50">
            <Search className="ml-3 sm:ml-4 text-slate-400 dark:text-slate-500 w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onSearchSubmit) {
                  onSearchSubmit();
                }
              }}
              placeholder="Search projects, design systems, tags (e.g. Harvesta, FinTech, Dashboard)..."
              className="w-full bg-transparent px-3 sm:px-4 py-2.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base focus:outline-none"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="text-xs px-2.5 py-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
            <button 
              onClick={onSearchSubmit}
              aria-label="Submit search"
              className="flex items-center gap-1.5 px-5 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-[#3BE29F] to-[#2dd48d] hover:from-[#34c98d] hover:to-[#22bc7a] text-[#131C2B] font-bold text-sm shadow-md transition-all duration-200 flex-shrink-0 cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-16">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#202A45] dark:bg-[#3BE29F] text-white dark:text-[#0B111B] shadow-md scale-105'
                    : 'bg-white/80 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Showcase Cards Staggered Display (Directly from Figma wireframe) */}
        <div className="relative max-w-5xl mx-auto pt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Card: Harvesta / Mobile Preview */}
            <div 
              onClick={() => leftProject && onSelectProject(leftProject)}
              className="md:col-span-4 group cursor-pointer transform md:-rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-white dark:bg-[#131C2B] rounded-2xl p-4 shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden text-left">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={leftProject?.coverImage}
                    alt={leftProject?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#202A45]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {leftProject?.category}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-[#3BE29F] transition-colors">
                    {leftProject?.title}
                  </h3>
                  <span className="text-xs text-slate-400">{leftProject?.platform}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {leftProject?.tagline}
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-400">
                  <span>{leftProject?.duration}</span>
                  <span className="font-semibold text-emerald-600 dark:text-[#3BE29F] flex items-center gap-1">
                    Inspect Token <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>

            {/* Center Hero Card: MediCare+ (Elevated, Prominent) */}
            <div 
              onClick={() => centerProject && onSelectProject(centerProject)}
              className="md:col-span-5 group cursor-pointer z-10 transform md:scale-105 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative bg-white dark:bg-[#152033] rounded-3xl p-5 shadow-2xl shadow-emerald-500/10 border-2 border-[#3BE29F]/40 dark:border-[#3BE29F]/50 overflow-hidden text-left">
                {/* Glow pill */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3BE29F]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={centerProject?.coverImage}
                    alt={centerProject?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 bg-[#3BE29F] text-[#0B111B] text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    FEATURED CASE STUDY
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider">Hospital Intelligence</p>
                    <p className="text-base font-bold drop-shadow">Where Care Meets Innovation</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-2xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#3BE29F] transition-colors">
                    {centerProject?.title}
                  </h3>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    <ShieldCheck size={14} />
                    <span>Verified UX</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {centerProject?.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-white dark:border-slate-700 bg-[#3BE29F]" />
                    <div className="w-5 h-5 rounded-full border border-white dark:border-slate-700 bg-[#202A45]" />
                    <div className="w-5 h-5 rounded-full border border-white dark:border-slate-700 bg-[#E1FE7D]" />
                    <span className="text-[11px] text-slate-400 font-mono ml-1">3 Tokens</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#202A45] dark:bg-white text-white dark:text-[#202A45] hover:opacity-90">
                    <span>View Case</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Card: FinFlow / Analytics Preview */}
            <div 
              onClick={() => rightProject && onSelectProject(rightProject)}
              className="md:col-span-3 group cursor-pointer transform md:rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-white dark:bg-[#131C2B] rounded-2xl p-4 shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden text-left">
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={rightProject?.coverImage}
                    alt={rightProject?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#202A45]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {rightProject?.category}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-[#3BE29F] transition-colors">
                    {rightProject?.title}
                  </h3>
                  <span className="text-xs text-slate-400">{rightProject?.platform}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {rightProject?.tagline}
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-400">
                  <span>{rightProject?.duration}</span>
                  <span className="font-semibold text-emerald-600 dark:text-[#3BE29F] flex items-center gap-1">
                    Details <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
