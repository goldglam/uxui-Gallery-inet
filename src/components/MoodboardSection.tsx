import React, { useState } from 'react';
import { Palette, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { Project } from '../types';

interface MoodboardSectionProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}

const COLOR_SWATCHES = [
  { name: 'All Colors', hex: 'all', bgClass: 'bg-gradient-to-tr from-rose-400 via-amber-400 via-emerald-400 to-sky-400' },
  { name: 'Amber / Gold', hex: '#F59E0B', bgClass: 'bg-amber-500' },
  { name: 'Orange', hex: '#F97316', bgClass: 'bg-orange-500' },
  { name: 'Lime / Yellow', hex: '#E1FE7D', bgClass: 'bg-[#E1FE7D]' },
  { name: 'Mint / Green', hex: '#3BE29F', bgClass: 'bg-[#3BE29F]' },
  { name: 'Cyan / Blue', hex: '#00F0FF', bgClass: 'bg-[#00F0FF]' },
  { name: 'Deep Navy', hex: '#202A45', bgClass: 'bg-[#202A45]' },
];

export const MoodboardSection: React.FC<MoodboardSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (e: React.MouseEvent, hex: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Filter projects if color matches either primary or secondary tokens
  const filteredProjects = selectedColor === 'all'
    ? projects
    : projects.filter(p => {
        const sel = selectedColor.toLowerCase();
        const primaryHex = p.tokens.primaryColor.hex.toLowerCase();
        const primaryMatch = primaryHex === sel || primaryHex.includes(sel) || sel.includes(primaryHex);
        
        const secondaryMatch = p.tokens.secondaryColors.some(c => {
          const secHex = c.hex.toLowerCase();
          return secHex === sel || secHex.includes(sel) || sel.includes(secHex);
        });

        // Color family matching for navy / slate / green
        let familyMatch = false;
        if (sel === '#202a45') {
          familyMatch = primaryHex.includes('202a45') || primaryHex.includes('0f172a') || primaryHex.includes('1e293b') ||
            p.tokens.secondaryColors.some(c => c.hex.toLowerCase().includes('202a45') || c.hex.toLowerCase().includes('0f172a') || c.hex.toLowerCase().includes('1e293b'));
        }

        return primaryMatch || secondaryMatch || familyMatch;
      });

  return (
    <section id="moodboard" className="py-24 bg-white dark:bg-[#0B111B] transition-colors duration-200 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Figma accent underline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-block relative">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#202A45] dark:text-white tracking-tight pb-3">
                Moodboard
              </h2>
              <div className="absolute left-0 bottom-0 w-full h-1.5 bg-[#3BE29F] rounded-full" />
            </div>

            {/* Find by colors selector */}
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Palette size={16} className="text-[#3BE29F]" />
                <span>Find by colors:</span>
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = selectedColor === swatch.hex;
                  return (
                    <button
                      key={swatch.name}
                      onClick={() => setSelectedColor(swatch.hex)}
                      title={swatch.name}
                      aria-label={`Filter by ${swatch.name}`}
                      className={`relative w-7 h-7 rounded-full ${swatch.bgClass} shadow-sm transition-all duration-200 transform hover:scale-115 flex items-center justify-center cursor-pointer ${
                        isSelected 
                          ? 'ring-3 ring-offset-2 ring-[#202A45] dark:ring-white scale-110' 
                          : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      {isSelected && (
                        <Check size={13} className={swatch.hex === '#E1FE7D' || swatch.hex === '#3BE29F' ? 'text-black' : 'text-white'} />
                      )}
                    </button>
                  );
                })}
              </div>

              {copiedHex && (
                <span className="text-xs text-emerald-600 dark:text-[#3BE29F] font-bold animate-pulse ml-2">
                  Copied {copiedHex}!
                </span>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-xl self-start sm:self-auto border border-slate-200/80 dark:border-slate-700">
            Showing {filteredProjects.length} design color palettes
          </div>
        </div>

        {/* Empty State when color has 0 matches */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 dark:bg-[#131C2B] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 max-w-md mx-auto">
            <Palette className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-1">
              ไม่มีโปรเจกต์ที่ใช้เฉดสีนี้
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              ลองเลือกเฉดสีอื่น หรือดูชุดสีทั้งหมดของระบบ
            </p>
            <button
              onClick={() => setSelectedColor('all')}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#3BE29F] text-[#0B111B] text-xs font-bold shadow-sm hover:bg-[#34c98d] transition-colors"
            >
              <RotateCcw size={13} />
              <span>แสดงทุกเฉดสี (View All Colors)</span>
            </button>
          </div>
        ) : (
          /* Moodboard Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
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
                className="group bg-[#FAFDFB] dark:bg-[#131C2B] rounded-2xl p-4.5 border border-slate-200/90 dark:border-slate-800 hover:border-[#3BE29F] dark:hover:border-[#3BE29F] shadow-md hover:shadow-xl hover:shadow-[#3BE29F]/10 transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3BE29F]"
              >
                {/* Image Preview */}
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-200 dark:bg-slate-800">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {project.category}
                    </div>
                  </div>

                  <h4 className="font-extrabold text-base text-[#202A45] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#3BE29F] transition-colors mb-1">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Color Token Strip & Typography */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-slate-400">Palette Tokens:</span>
                    <div className="flex items-center gap-1.5">
                      <div
                        onClick={(e) => handleCopyHex(e, project.tokens.primaryColor.hex)}
                        className="w-4 h-4 rounded-full border border-white dark:border-slate-700 shadow-xs cursor-pointer hover:scale-125 transition-transform"
                        style={{ backgroundColor: project.tokens.primaryColor.hex }}
                        title={`Click to copy: ${project.tokens.primaryColor.name} (${project.tokens.primaryColor.hex})`}
                      />
                      {project.tokens.secondaryColors.map((c, i) => (
                        <div
                          key={i}
                          onClick={(e) => handleCopyHex(e, c.hex)}
                          className="w-4 h-4 rounded-full border border-white dark:border-slate-700 shadow-xs cursor-pointer hover:scale-125 transition-transform"
                          style={{ backgroundColor: c.hex }}
                          title={`Click to copy: ${c.name} (${c.hex})`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono truncate max-w-[130px]">{project.tokens.typography.split(',')[0]}</span>
                    <span className="font-bold text-[#059669] dark:text-[#3BE29F] flex items-center gap-0.5 group-hover:underline">
                      View <ArrowRight size={11} />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
