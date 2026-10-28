import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  Download, 
  Mail, 
  X, 
  Maximize2, 
  Minimize2, 
  ArrowRight,
  Sparkles,
  Layers,
  Check,
  Eye,
  Star,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProject: (p: Project) => void;
  allProjects: Project[];
  onRequestDesign?: (projectTitle?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectProject,
  allProjects,
  onRequestDesign,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Keyboard Escape listener
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  // 3 related projects dynamically filtered
  const relatedProjects = allProjects
    .filter(p => p.id !== project.id)
    .slice(0, 3);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(`${label} (${text})`);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const handleDownload = () => {
    const data = {
      project: project.title,
      client: project.client,
      type: project.type,
      category: project.category,
      platform: project.platform,
      duration: project.duration,
      year: project.year,
      tokens: project.tokens,
      tags: project.tags,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}-design-tokens.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center ${isFullScreen ? 'p-0' : 'p-2 sm:p-6'} overflow-y-auto bg-black/75 backdrop-blur-md animate-fade-in`}
      onClick={onClose}
    >
      <div 
        className={`relative w-full ${isFullScreen ? 'h-full max-h-screen rounded-none' : 'max-w-5xl rounded-3xl my-6 max-h-[92vh]'} bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col text-left transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header Bar */}
        <div className="sticky top-0 z-30 px-6 py-4 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          {/* Breadcrumb: < Category > Title */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button 
              onClick={onClose}
              className="p-1 -ml-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1 group"
              title="ย้อนกลับ (Back to gallery)"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hover:text-emerald-600 dark:hover:text-[#3BE29F]">{project.category || 'Projects'}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-600">&gt;</span>
            <span className="text-[#1E293B] dark:text-white font-bold">{project.title}</span>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex"
              title={isFullScreen ? "ยุบหน้าต่าง" : "ขยายเต็มจอ (Full Screen)"}
            >
              {isFullScreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
            <button
              onClick={() => onToggleFavorite(project.id)}
              className={`p-2 rounded-full border border-slate-200 dark:border-slate-700 transition-colors ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800' 
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="บันทึกในรายการโปรด"
            >
              <Heart size={15} className={isFavorite ? "fill-rose-500" : ""} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="ดาวน์โหลด Token / Specs JSON"
            >
              <Download size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="ปิดหน้าต่าง (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Canvas */}
        <div className="overflow-y-auto px-6 sm:px-12 py-8 space-y-10 bg-gradient-to-b from-[#F4FAF6]/60 via-white to-white dark:from-[#0B1512]/40 dark:via-[#0F172A] dark:to-[#0F172A]">
          
          {/* Main Title & Client */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#3BE29F]/15 text-[#059669] dark:text-[#3BE29F] border border-[#3BE29F]/30">
                {project.category}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Client: {project.client}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E293B] dark:text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 mt-2 font-normal">
              {project.tagline}
            </p>
          </div>

          {/* 1. Dynamic Hero Perspective Graphic Showcase */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-[#131C2B] via-[#0E1724] to-[#0A111A] p-4 sm:p-8 text-white">
            {/* Ambient Backlight */}
            <div 
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
              style={{ backgroundColor: project.tokens.primaryColor.hex }}
            />
            <div 
              className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ backgroundColor: project.tokens.secondaryColors[0]?.hex || '#3BE29F' }}
            />

            {/* Mockup Container */}
            <div className="relative z-10 mx-auto max-w-4xl bg-black/40 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-white/10 shadow-2xl">
              <div className="relative aspect-[16/9] sm:aspect-[16/8.5] rounded-xl overflow-hidden bg-slate-900 border border-white/15">
                {/* Backdrop Image */}
                <img 
                  src={project.coverImage} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                
                {/* Overlay Project HUD Stage */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex flex-col justify-between p-4 sm:p-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: project.tokens.primaryColor.hex }} />
                      <span className="text-sm font-bold tracking-tight text-white">{project.title} Interface</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md font-mono border border-white/15">
                        {project.platform}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck size={13} /> Verified UI
                      </div>
                    </div>
                  </div>

                  {/* Center HUD Spotlight */}
                  <div className="my-auto py-2">
                    <div className="inline-block p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 shadow-xl max-w-md">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                        <Sparkles size={13} /> Key Design Highlight
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {project.type}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {project.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Metrics & Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/15 text-xs text-slate-300">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/10 backdrop-blur-xs font-mono text-[10px]">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1 text-white">
                        <Eye size={13} className="text-[#3BE29F]" /> {project.metrics?.views || 1500} views
                      </span>
                      <span className="flex items-center gap-1 text-white">
                        <Star size={13} className="text-amber-400 fill-amber-400" /> {project.metrics?.rating || 4.9}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Specs Metadata Pills (Duration | Platform | Type) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <span className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Duration
              </span>
              <div className="w-full py-2.5 px-5 rounded-full border border-slate-300 dark:border-slate-700 bg-[#FAFBF6] dark:bg-slate-800/80 text-sm font-medium text-slate-900 dark:text-slate-100 shadow-xs">
                {project.duration || '2 months'}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Platform
              </span>
              <div className="w-full py-2.5 px-5 rounded-full border border-slate-300 dark:border-slate-700 bg-[#FAFBF6] dark:bg-slate-800/80 text-sm font-medium text-slate-900 dark:text-slate-100 shadow-xs">
                {project.platform}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Type
              </span>
              <div className="w-full py-2.5 px-5 rounded-full border border-slate-300 dark:border-slate-700 bg-[#FAFBF6] dark:bg-slate-800/80 text-sm font-medium text-slate-900 dark:text-slate-100 shadow-xs">
                {project.type}
              </div>
            </div>
          </div>

          {/* 3. Description Paragraph */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Project Overview</h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              {project.detailedDescription || project.description}
            </p>
          </div>

          {/* 4. Screen Breakdown Gallery (Dynamic from project.screens) */}
          <div className="space-y-6 pt-2">
            <h3 className="text-2xl font-black text-[#1E293B] dark:text-white">
              Interface Screens & Key User Flows
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screens.map((screen, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex flex-col ${
                    idx === 2 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-base text-[#1E293B] dark:text-white">{screen.title}</h4>
                      {screen.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{screen.description}</p>
                      )}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                      {screen.type}
                    </span>
                  </div>

                  <div className={`relative ${idx === 2 ? 'aspect-[16/8]' : 'aspect-[4/3]'} bg-slate-100 dark:bg-slate-800 overflow-hidden`}>
                    <img 
                      src={screen.image || project.coverImage} 
                      alt={screen.title}
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Moodboard Section (Dynamic Color Swatches & Typography) */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-[#1E293B] dark:text-white">
                Moodboard & Design Tokens
              </h3>
              {copiedToken && (
                <span className="text-xs text-emerald-600 dark:text-[#3BE29F] font-bold animate-pulse flex items-center gap-1">
                  <Check size={14} /> Copied {copiedToken}
                </span>
              )}
            </div>

            {/* Typography Standard Row */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Typography</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-sans tracking-wide">
                {project.tokens.typography}
              </span>
            </div>

            {/* Colors & Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
              <div className="flex flex-wrap items-start gap-8">
                <span className="text-sm font-bold text-slate-900 dark:text-white pt-2">Colors</span>

                {/* Dynamic Primary Swatch */}
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2 font-medium">Primary</span>
                  <div 
                    onClick={() => copyToClipboard(project.tokens.primaryColor.hex, project.tokens.primaryColor.name)}
                    className="w-24 h-24 rounded-2xl p-2.5 flex flex-col justify-end text-xs font-bold shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform border border-black/5"
                    style={{ backgroundColor: project.tokens.primaryColor.hex }}
                    title={`Click to copy: ${project.tokens.primaryColor.name} (${project.tokens.primaryColor.hex})`}
                  >
                    <span className="text-white drop-shadow-md truncate">{project.tokens.primaryColor.name}</span>
                    <span className="font-mono text-[10px] font-normal text-white/90 drop-shadow">{project.tokens.primaryColor.hex}</span>
                  </div>
                </div>

                {/* Dynamic Secondary Swatches */}
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2 font-medium">Secondary Tokens</span>
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.tokens.secondaryColors.map((color, cIdx) => (
                      <div 
                        key={cIdx}
                        onClick={() => copyToClipboard(color.hex, color.name)}
                        className="w-24 h-24 rounded-2xl p-2.5 flex flex-col justify-end text-xs font-bold shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform border border-black/10"
                        style={{ backgroundColor: color.hex }}
                        title={`Click to copy: ${color.name} (${color.hex})`}
                      >
                        <span className="text-white drop-shadow-md truncate">{color.name}</span>
                        <span className="font-mono text-[10px] font-normal text-white/90 drop-shadow">{color.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                {/* Email / Contact Button */}
                <button
                  onClick={() => onRequestDesign && onRequestDesign(project.title)}
                  className="w-11 h-11 rounded-full bg-[#1E293B] hover:bg-[#334155] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
                  title={`ส่งคำขอปรึกษาการออกแบบสำหรับ ${project.title}`}
                >
                  <Mail size={16} />
                </button>

                {/* Heart / Favorite Button */}
                <button
                  onClick={() => onToggleFavorite(project.id)}
                  className={`w-11 h-11 rounded-full bg-[#1E293B] hover:bg-[#334155] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 ${
                    isFavorite ? 'text-rose-400' : ''
                  }`}
                  title={isFavorite ? "นำออกจากรายการโปรด" : "บันทึกในรายการโปรด"}
                >
                  <Heart size={16} className={isFavorite ? "fill-rose-400 text-rose-400" : ""} />
                </button>

                {/* Download Assets Button */}
                <button
                  onClick={handleDownload}
                  className="w-11 h-11 rounded-full bg-[#1E293B] hover:bg-[#334155] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
                  title="ดาวน์โหลด Token / Assets JSON"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* 6. Dynamic Related Projects Grid */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-lg font-bold text-[#1E293B] dark:text-white mb-4">
              Related Projects
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectProject(rel)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img 
                    src={rel.coverImage} 
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3.5">
                    <div className="text-white">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-black/50 text-[#3BE29F] border border-[#3BE29F]/30 block w-max mb-1">
                        {rel.category}
                      </span>
                      <span className="text-white text-xs font-bold flex items-center gap-1">
                        {rel.title} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
