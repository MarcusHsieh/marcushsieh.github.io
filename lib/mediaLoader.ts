import { MediaItem } from 'types';

// Helper function to get file extension
const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Helper function to determine media type based on file extension
const getMediaType = (filename: string): 'image' | 'video' => {
  const extension = getFileExtension(filename);
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'heic', 'avif'];
  
  if (videoExtensions.includes(extension)) {
    return 'video';
  }
  return 'image';
};

// Helper function to check if image should be converted to WebP (now rarely needed)
const shouldConvertToWebP = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return ['png', 'jpg', 'jpeg', 'heic'].includes(extension);
};

// Helper function to create media items from a list of filenames
export const createMediaFromFiles = (projectFolder: string, filenames: string[]): MediaItem[] => {
  return filenames
    .filter(filename => {
      const ext = getFileExtension(filename);
      return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'heic', 'avif', 'mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext);
    })
    .map(filename => {
      const mediaType = getMediaType(filename);
      
      if (mediaType === 'image') {
        return {
          type: 'image' as const,
          src: `/${projectFolder}/${filename}`,
          alt: `${projectFolder} image`,
          // All images are now optimized WebP format
          needsOptimization: false
        };
      } else {
        // Video handling
        return {
          type: 'video' as const,
          src: `/${projectFolder}/${filename}`,
          alt: `${projectFolder} video`,
          // For videos, try to find a thumbnail with similar name
          thumbnail: `/${projectFolder}/${filename.replace(/\.[^/.]+$/, '')}-thumb.webp`
        };
      }
    });
};

// Utility function to auto-generate media for a project
// This assumes files are organized like: /public/projectname/image1.jpg, video1.mp4, etc.
export const autoLoadProjectMedia = (projectFolder: string, manualFiles?: string[]): MediaItem[] => {
  // If manual files are provided, use them
  if (manualFiles && manualFiles.length > 0) {
    return createMediaFromFiles(projectFolder, manualFiles);
  }
  
  // For static builds, we need to manually specify files since we can't read filesystem
  // But this provides a cleaner way to organize the data
  return [];
};

// Project-specific media configurations
// All images converted to optimal WebP format for performance
export const PROJECT_MEDIA_CONFIG: Record<string, string[]> = {
  // Recent Hackathon Projects - match actual directory names
  'navaid': ['20250525_053857815_iOS.webp', '20250525_053910355_iOS.webp', '20250525_191654191_iOS.webp', 'screenshot-1.webp', 'screenshot-2.webp', '20250531_090420000_iOS.MOV'],
  'kerminator': [
    'image-1.webp',
    'image-2.webp', 
    'image-3.webp',
    'image-4.webp',
    'image-5.webp',
    'image-6.webp',
    'image.webp'
  ],
  
  // Major Projects
  'spiderbot': [
    'screenshot-1.webp', 'screenshot-2.webp', 'screenshot-3.webp', 'screenshot-4.webp', 'screenshot-5.webp',
    'screenshot-6.webp', 'screenshot-7.webp', 'screenshot-8.webp', 'screenshot-9.webp',
    'hardware design.webp', 'initial design.webp',
    '20250520_140927041_iOS.webp', '20250602_135119599_iOS.webp', '20250602_171243548_iOS.webp',
    '20250603_094710012_iOS.webp', '20250603_094724297_iOS.webp', '20250616_002951735_iOS.webp'
  ],
  'bin-boy': [
    '20250419_202548781_iOS.webp', '20250420_090007118_iOS.webp', '20250420_145907750_iOS.webp',
    '20250420_223759476_iOS.webp', '20250420_223842023_iOS.webp', '20250420_223859613_iOS.webp',
    '20250420_223919076_iOS.webp', '20250420_224008494_iOS.webp', '20250609_161601669_iOS.webp',
    'bin boy mvt.mp4'
  ],
  'moll-e-autonomous-shopping-cart': [
    'shopping-cart.webp', 'navigation.webp', 'img1.webp', 'img3.webp', 'img5.webp',
    '20250407_000817416_iOS.webp', '20250407_000923693_iOS.webp', '20250407_000946051_iOS.webp',
    '20250407_001116820_iOS.webp', '20250407_001146808_iOS.webp', '20250407_001304693_iOS.webp',
    '20250406_213238000_iOS.MOV'
  ],
  'racer-3000': ['racer-image-1.webp', 'racer-image-2.webp', 'mhsie026_custom_lab_final_demo.mp4'],
  
  // AI/ML Projects
  'yumtogether': ['image-1.webp', 'yum-together.webp'],
  'moonify': ['image-1.webp', 'image-2.webp', 'space.webp'],
  
  // Development Tools
  'labeling-tool': ['image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'],
  'raspberry-pi-wi-fi-router': ['wifi-router.webp', 'image-1.webp'],
  
  // Games & Software
  'chess-crusaders': ['chess-crusaders.webp', 'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'],
  
  // Engineering Tools
  'fsae-airfoil-wing-generator': ['E423.webp', 'E423-CAD-side-view.webp', 'E423-CAD-top-down-view.webp', 'E423-full-front-wing-graph.webp']
};

// Project key to directory name mapping
const PROJECT_DIRECTORY_MAP: Record<string, string> = {
  'navaid': 'navaid',
  'kerminator': 'kerminator',
  'spiderbot': 'spiderbot',
  'bin-boy': 'bin-boy',
  'moll-e-autonomous-shopping-cart': 'moll-e',
  'racer-3000': 'racer-3000',
  'yumtogether': 'yum',
  'moonify': 'moonify',
  'labeling-tool': 'labeling-tool',
  'raspberry-pi-wi-fi-router': 'wifi-router',
  'chess-crusaders': 'chess-crusaders',
  'fsae-airfoil-wing-generator': 'airfoil'
};

// Generate media for a project
export const getProjectMedia = (projectKey: string): MediaItem[] => {
  const files = PROJECT_MEDIA_CONFIG[projectKey] || [];
  const directoryName = PROJECT_DIRECTORY_MAP[projectKey] || projectKey;
  return createMediaFromFiles(directoryName, files);
};

// Optimization helper functions
export const getOptimizationRecommendations = (): { 
  message: string; 
  files: { original: string; recommended: string; reason: string }[] 
} => {
  // All images are now pre-optimized to WebP format
  const webpCount = Object.values(PROJECT_MEDIA_CONFIG)
    .flat()
    .filter(filename => filename.endsWith('.webp')).length;
  
  return {
    message: `✅ All ${webpCount} images are already optimized to WebP format! 🚀`,
    files: [] // No recommendations needed
  };
};

// Log optimization recommendations (useful for development)
export const logOptimizationRecommendations = (): void => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const recommendations = getOptimizationRecommendations();
    console.group('🖼️ Image Optimization Status');
    console.log(recommendations.message);
    console.log('🎯 Portfolio is fully optimized for maximum performance!');
    console.groupEnd();
  }
};