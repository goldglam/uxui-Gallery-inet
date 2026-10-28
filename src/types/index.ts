export interface Project {
  id: string;
  title: string;
  client: string;
  tagline: string;
  description: string;
  detailedDescription?: string;
  category: 'FinTech' | 'Healthcare' | 'Smart Farm' | 'Logistics' | 'E-Commerce' | 'Enterprise';
  platform: 'Website' | 'Mobile' | 'Dashboard' | 'Multi-platform';
  duration: string;
  type: string;
  year: number;
  featured: boolean;
  coverImage: string;
  screens: {
    title: string;
    description?: string;
    image: string;
    type: 'register' | 'dashboard' | 'landing' | 'admin' | 'mobile';
  }[];
  tokens: {
    typography: string;
    primaryColor: { name: string; hex: string };
    secondaryColors: { name: string; hex: string }[];
  };
  metrics?: {
    likes: number;
    views: number;
    rating: number;
  };
  tags: string[];
}

export type ThemeMode = 'light' | 'dark';

export type FeatureKey = 'register' | 'dashboard' | 'landing' | 'admin';

export interface RequestFormData {
  projectName: string;
  requesterName: string;
  requesterEmail: string;
  department: string;
  projectType: string;
  timeline: string;
  brief: string;
}

