import React, { useState } from 'react';
import { Heart, Bell, Sun, Moon, Sparkles, Menu, X, Check, ExternalLink } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  favoritesCount: number;
  isFavoritesFilterActive?: boolean;
  onToggleFavoritesFilter?: () => void;
  onRequestClick: () => void;
  onExploreClick: () => void;
  onHomeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  favoritesCount,
  isFavoritesFilterActive = false,
  onToggleFavoritesFilter,
  onRequestClick,
  onExploreClick,
  onHomeClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleMobileNavClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-[#0B111B]/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={onHomeClick} 
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onHomeClick(); }}
          className="flex items-center gap-3 cursor-pointer group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3BE29F] rounded-xl p-1"
          aria-label="INET Gallery Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3BE29F] to-[#E1FE7D] flex items-center justify-center shadow-md shadow-[#3BE29F]/20 group-hover:scale-105 transition-transform duration-200">
            <span className="font-extrabold text-[#202A45] text-xl tracking-tighter">iN</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold text-2xl tracking-tight text-[#202A45] dark:text-white">INET</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#3BE29F]/15 text-[#059669] dark:text-[#3BE29F] border border-[#3BE29F]/30">
                GALLERY
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase font-medium text-slate-500 dark:text-slate-400">
              UX/UI Design Resource Hub
            </span>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
          <button 
            onClick={onHomeClick}
            className="px-5 py-2 text-sm font-semibold rounded-full bg-white dark:bg-[#1E293B] text-[#202A45] dark:text-white shadow-sm transition-all"
          >
            Home
          </button>
          <button 
            onClick={onExploreClick}
            className="px-5 py-2 text-sm font-medium rounded-full text-slate-600 dark:text-slate-300 hover:text-[#202A45] dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            Explore
          </button>
          <a 
            href="#features"
            className="px-5 py-2 text-sm font-medium rounded-full text-slate-600 dark:text-slate-300 hover:text-[#202A45] dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            Features
          </a>
          <a 
            href="#moodboard"
            className="px-5 py-2 text-sm font-medium rounded-full text-slate-600 dark:text-slate-300 hover:text-[#202A45] dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            Moodboard
          </a>
          <button 
            onClick={onRequestClick}
            className="px-5 py-2 text-sm font-medium rounded-full text-slate-600 dark:text-slate-300 hover:text-[#202A45] dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            Request
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-[#E1FE7D]" />}
          </button>

          {/* Favorites Counter & Filter */}
          <button
            onClick={onToggleFavoritesFilter || onExploreClick}
            title={isFavoritesFilterActive ? "Showing Favorites Only (Click to show all)" : "Filter Favorites"}
            aria-label={`Favorites: ${favoritesCount} saved`}
            className={`relative p-2.5 rounded-full border transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3BE29F] ${
              isFavoritesFilterActive 
                ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-500' 
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Heart size={18} className={favoritesCount > 0 ? "fill-rose-500 text-rose-500" : ""} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-none"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3BE29F]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#131C2B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-fade-in text-left">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Updates & Announcements</span>
                  <span className="text-[10px] text-emerald-600 dark:text-[#3BE29F] font-semibold">2026 Edition</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                    <p className="font-bold text-slate-800 dark:text-white">🎨 Design System 2026 Live</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Tokens and typography updated to WCAG 2.2 AA standard.</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                    <p className="font-bold text-slate-800 dark:text-white">✨ Token JSON Export</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Download design tokens directly from any project view.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Send Request Button (Desktop) */}
          <button
            onClick={onRequestClick}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202A45] hover:bg-[#151C30] text-white dark:bg-[#3BE29F] dark:hover:bg-[#34c98d] dark:text-[#0B111B] font-semibold text-sm shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#3BE29F]"
          >
            <Sparkles size={16} className="text-[#3BE29F] dark:text-[#0B111B]" />
            <span>Request Project</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown (< md) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0B111B]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 animate-fade-in text-left">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => handleMobileNavClick(onHomeClick)}
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm text-[#202A45] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleMobileNavClick(onExploreClick)}
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Explore Projects
            </button>
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Features & UI Specs
            </a>
            <a
              href="#moodboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Moodboard & Colors
            </a>
            
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => handleMobileNavClick(onRequestClick)}
                className="w-full py-3 px-4 rounded-xl bg-[#3BE29F] hover:bg-[#34c98d] text-[#0B111B] font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Request Project Support</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
