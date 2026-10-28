import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RecentlyProjects } from './components/RecentlyProjects';
import { FeaturesSection } from './components/FeaturesSection';
import { MoodboardSection } from './components/MoodboardSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { RequestModal } from './components/RequestModal';
import { PROJECTS, CATEGORIES } from './data/mockData';
import { Project, ThemeMode } from './types';

export const App: React.FC = () => {
  // Theme with localStorage persistence & system preference check
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('inet_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Favorites with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('inet_favorites');
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse favorites from localStorage', err);
      }
    }
    return ['harvesta', 'medicare'];
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestInitialProject, setRequestInitialProject] = useState<string | undefined>(undefined);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('inet_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('inet_theme', 'light');
    }
  }, [theme]);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('inet_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage', err);
    }
  }, [favorites]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleFavoritesFilter = () => {
    setFavoritesOnly(prev => !prev);
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchSubmit = () => {
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFavoritesOnly(false);
  };

  // Filter projects by search, category, and favorites-only
  const filteredProjects = PROJECTS.filter(project => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some(t => t.toLowerCase().includes(q)) ||
      project.category.toLowerCase().includes(q) ||
      project.client.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesFavorites = !favoritesOnly || favorites.includes(project.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B111B] text-[#202A45] dark:text-slate-100 font-sans antialiased selection:bg-[#3BE29F] selection:text-[#0B111B] transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        favoritesCount={favorites.length}
        isFavoritesFilterActive={favoritesOnly}
        onToggleFavoritesFilter={handleToggleFavoritesFilter}
        onRequestClick={() => {
          setRequestInitialProject(undefined);
          setIsRequestModalOpen(true);
        }}
        onExploreClick={() => {
          const el = document.getElementById('explore-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setFavoritesOnly(false);
        }}
        categories={CATEGORIES}
        featuredProjects={PROJECTS.filter(p => p.featured)}
        onSelectProject={(p) => setSelectedProject(p)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Recently Projects (Curated Works) */}
      <div id="explore-section">
        <RecentlyProjects
          projects={filteredProjects}
          favorites={favorites}
          isFavoritesFilterActive={favoritesOnly}
          onToggleFavoritesFilter={handleToggleFavoritesFilter}
          onToggleFavorite={handleToggleFavorite}
          onSelectProject={(p) => setSelectedProject(p)}
          onViewAll={() => {
            setSelectedCategory('All');
            setFavoritesOnly(false);
          }}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Features Showcase Section */}
      <FeaturesSection
        projects={PROJECTS}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Moodboard & Color Tokens */}
      <MoodboardSection
        projects={PROJECTS}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* CTA Banner */}
      <CtaBanner 
        onRequestClick={() => {
          setRequestInitialProject(undefined);
          setIsRequestModalOpen(true);
        }} 
      />

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal ("Project dt" View) */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isFavorite={selectedProject ? favorites.includes(selectedProject.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onSelectProject={(p) => setSelectedProject(p)}
        allProjects={PROJECTS}
        onRequestDesign={(projectTitle) => {
          setSelectedProject(null);
          setRequestInitialProject(projectTitle);
          setIsRequestModalOpen(true);
        }}
      />

      {/* Project Request Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        initialProjectTitle={requestInitialProject}
      />
    </div>
  );
};

export default App;
