export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  thumbnail?: string; // For videos
  fallback?: string; // Fallback image path for browser compatibility
  needsOptimization?: boolean; // Flag to indicate if image should be converted to WebP
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string; // Extended description for modal
  images: string[]; // Keep for backward compatibility
  media?: MediaItem[]; // New media array supporting images and videos
  github: string;
  demo: string;
  tags: string[];
  hackathon?: {
    event: string;
    achievement: string;
  };
}

export interface SocialLink {
  name: string;
  icon: JSX.Element;
  url: string;
}