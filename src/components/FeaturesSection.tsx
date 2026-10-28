import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, CheckCircle2, Sparkles, Layers, Shield, Laptop, UserPlus } from 'lucide-react';
import { Project, FeatureKey } from '../types';
import { FEATURE_CATEGORIES } from '../data/mockData';

interface FeaturesSectionProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>('register');

  const currentCategory = FEATURE_CATEGORIES.find(f => f.key === activeFeature) || FEATURE_CATEGORIES[0];

  // Get matching projects for current feature
  const matchedProjects = projects.filter(p => 
    currentCategory.relatedProjects.includes(p.id) ||
    p.screens.some(s => s.type === activeFeature)
  );

  return (
    <section id="features" className="py-24 bg-[#FAFDFB] dark:bg-[#08101C] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Figma accent underline */}
        <div className="mb-14 text-left">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#202A45] dark:text-white tracking-tight pb-3">
              Features
            </h2>
            <div className="absolute left-0 bottom-0 w-full h-1.5 bg-[#E1FE7D] rounded-full" />
          </div>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl">
            สำรวจการออกแบบ UI Components และโฟลว์การใช้งานตามหมวดหมู่ฟังก์ชันหลักของระบบ
          </p>
        </div>

        {/* 2-Column Interactive Split Layout (Figma wireframe design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vertical Accordion Menu */}
          <div className="lg:col-span-5 space-y-3.5">
            {FEATURE_CATEGORIES.map((feature) => {
              const isActive = activeFeature === feature.key;

              return (
                <div
                  key={feature.key}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? 'bg-[#3BE29F] border-[#3BE29F] shadow-xl shadow-[#3BE29F]/15'
                      : 'bg-white dark:bg-[#131C2B] border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setActiveFeature(feature.key as FeatureKey)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isActive 
                          ? 'bg-[#202A45] text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {feature.key === 'register' && <UserPlus size={16} />}
                        {feature.key === 'dashboard' && <Layers size={16} />}
                        {feature.key === 'landing' && <Laptop size={16} />}
                        {feature.key === 'admin' && <Shield size={16} />}
                      </div>
                      <span className={`text-lg font-extrabold tracking-tight ${
                        isActive ? 'text-[#0B111B]' : 'text-[#202A45] dark:text-white'
                      }`}>
                        {feature.title}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                      isActive ? 'bg-[#202A45] text-[#3BE29F]' : 'text-slate-400'
                    }`}>
                      {isActive ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {/* Expanded Description */}
                  {isActive && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[#131C2B] dark:text-[#0B111B] font-medium leading-relaxed border-t border-black/10 animate-fade-in">
                      <p>{feature.description}</p>
                      <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-bold text-[#202A45]">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 size={14} /> Available in {feature.relatedProjects.length} Projects
                        </span>
                        <span className="underline cursor-pointer flex items-center gap-1">
                          View Design Spec <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom View More Link */}
            <div className="pt-2">
              <button 
                onClick={() => {
                  const keys: FeatureKey[] = ['register', 'dashboard', 'landing', 'admin'];
                  const nextIdx = (keys.indexOf(activeFeature) + 1) % keys.length;
                  setActiveFeature(keys[nextIdx]);
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#202A45] hover:bg-[#182136] text-white font-bold text-sm flex items-center justify-between shadow-md transition-all group"
              >
                <span>Cycle Next Feature Spec</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Mockup Cards (Directly matching Figma UI) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {matchedProjects.slice(0, 2).map((project, idx) => {
                const screen = project.screens.find(s => s.type === activeFeature) || project.screens[0];

                return (
                  <div
                    key={project.id + idx}
                    onClick={() => onSelectProject(project)}
                    className="group bg-white dark:bg-[#131C2B] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 hover:border-[#3BE29F]/70 dark:hover:border-[#3BE29F]/70 shadow-xl hover:shadow-2xl hover:shadow-[#3BE29F]/15 transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1.5"
                  >
                    {/* Mockup Preview Window */}
                    <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 mb-4 h-64 flex flex-col justify-center items-center p-3">
                      {/* Window header dots */}
                      <div className="absolute top-2.5 left-3 flex items-center gap-1.5 z-10">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-mono text-slate-400 ml-2">{project.title} UI</span>
                      </div>

                      <img
                        src={screen.image || project.coverImage}
                        alt={screen.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 mt-4"
                      />

                      {/* Overlay badge */}
                      <div className="absolute bottom-3 left-3 bg-[#202A45]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {screen.title}
                      </div>
                    </div>

                    {/* Mockup Metadata */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-extrabold text-lg text-[#202A45] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#3BE29F] transition-colors">
                            {project.title}
                          </h4>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {project.platform}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                          {screen.description || project.tagline}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#3BE29F]" />
                          <span>{project.type}</span>
                        </div>
                        <span className="font-bold text-[#059669] dark:text-[#3BE29F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Inspect <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
