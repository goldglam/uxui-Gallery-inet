import React, { useState } from 'react';
import { Heart, ArrowUpRight, ArrowRight, Eye, Sparkles, SearchX, RotateCcw } from 'lucide-react';
import { Project } from '../types';

interface RecentlyProjectsProps {
  projects: Project[];
  favorites: string[];
  isFavoritesFilterActive?: boolean;
  onToggleFavoritesFilter?: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProject: (p: Project) => void;
  onViewAll: () => void;
  onResetFilters?: () => void;
}

export const RecentlyProjects: React.FC<RecentlyProjectsProps> = ({
  projects,
  favorites,
  isFavoritesFilterActive = false,
  onToggleFavoritesFilter,
  onToggleFavorite,
  onSelectProject,
  onViewAll,
  onResetFilters,
}) => {
  const [showAll, setShowAll] = useState(false);

  // If projects <= 6 show all, else toggle between 6 and all
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section className="py-20 bg-white dark:bg-[#0B111B] transition-colors duration-200 border-t border-slate-100 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3BE29F]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Curated Works
              </span>
              {isFavoritesFilterActive && (
                <span className="ml-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                  <Heart size={12} className="fill-rose-500" /> Favorites Only ({projects.length})
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202A45] dark:text-white tracking-tight">
              Recently Projects
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isFavoritesFilterActive && onToggleFavoritesFilter && (
              <button
                onClick={onToggleFavoritesFilter}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span>Show All Projects</span>
              </button>
            )}

            {projects.length > 3 && (
              <button
                onClick={() => {
                  setShowAll(!showAll);
                  onViewAll();
                }}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3BE29F] hover:bg-[#34c98d] text-[#0B111B] text-sm font-bold shadow-md shadow-[#3BE29F]/20 transition-all duration-200 transform hover:translate-x-1"
              >
                <span>{showAll ? 'Show Less' : `View all (${projects.length})`}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 dark:bg-[#131C2B] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 max-w-xl mx-auto animate-fade-in">
            <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SearchX size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              {isFavoritesFilterActive ? "ยังไม่มีโปรเจกต์ที่บันทึกไว้ในรายการโปรด" : "ไม่พบโปรเจกต์ที่ตรงกับเงื่อนไขการค้นหา"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              {isFavoritesFilterActive 
                ? "คุณสามารถกดที่ไอคอนหัวใจบนการ์ดผลงานที่สนใจเพื่อเพิ่มในรายการโปรด" 
                : "ลองปรับเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อสำรวจผลงานเพิ่มเติม"}
            </p>
            {onResetFilters && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#202A45] hover:bg-[#151C30] text-white font-bold text-xs shadow-md transition-all"
              >
                <RotateCcw size={14} />
                <span>ล้างตัวกรองทั้งหมด (Reset Filters)</span>
              </button>
            )}
          </div>
        ) : (
          /* Project Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => {
              const isFav = favorites.includes(project.id);

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  className="group relative bg-[#F8FAFC] dark:bg-[#131C2B] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 hover:border-[#3BE29F]/60 dark:hover:border-[#3BE29F]/60 shadow-lg shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-[#3BE29F]/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3BE29F]"
                >
                  {/* Image Banner */}
                  <div className="relative h-52 rounded-xl overflow-hidden mb-5 bg-slate-200 dark:bg-slate-800">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Top Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#202A45]/90 backdrop-blur-md text-white border border-white/10 shadow-sm">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200">
                        {project.platform}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => onToggleFavorite(project.id, e)}
                      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors z-10 shadow-sm"
                    >
                      <Heart
                        size={18}
                        className={isFav ? "fill-rose-500 text-rose-500" : "transition-transform group-hover:scale-110"}
                      />
                    </button>

                    {/* Metrics Badge at bottom */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-3 text-white text-xs bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                      <span className="flex items-center gap-1 font-mono">
                        <Eye size={13} className="text-[#3BE29F]" /> {project.metrics?.views || 1200}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-extrabold text-xl text-[#202A45] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#3BE29F] transition-colors flex items-center gap-1.5">
                          <span>{project.title}</span>
                          <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </h3>
                        <span className="text-xs font-mono text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {project.year}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags and Tokens Footer */}
                    <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-800 shadow-sm"
                          style={{ backgroundColor: project.tokens.primaryColor.hex }}
                          title={project.tokens.primaryColor.name}
                        />
                        <span className="font-mono text-[11px] truncate max-w-[120px]">
                          {project.tokens.primaryColor.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[#059669] dark:text-[#3BE29F] font-semibold group-hover:underline">
                        <span>View Case</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
