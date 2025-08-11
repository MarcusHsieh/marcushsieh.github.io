/**
 * Performance Optimization Utilities
 * 
 * This file contains utilities for optimizing app performance,
 * including lazy loading, preloading, and runtime optimizations.
 */

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload fonts
    const fontUrls = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-var.woff'
    ];
    
    fontUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload critical images
    const criticalImages = [
      '/profile.webp',
      '/MH.ico'
    ];
    
    criticalImages.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Optimize images with lazy loading
export const optimizeImageLoading = () => {
  if (typeof window !== 'undefined' && 'loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
      (img as HTMLImageElement).src = (img as HTMLImageElement).dataset.src!;
      img.removeAttribute('data-src');
    });
  }
};

// Memory cleanup utilities
export const cleanupMemoryLeaks = () => {
  if (typeof window !== 'undefined') {
    // Clear performance metrics periodically
    const performanceMetrics = (window as any).__performanceMetrics;
    if (performanceMetrics && performanceMetrics.length > 1000) {
      (window as any).__performanceMetrics = performanceMetrics.slice(-100);
    }
    
    // Force garbage collection in development (if available)
    if (process.env.NODE_ENV === 'development' && (window as any).gc) {
      (window as any).gc();
    }
  }
};

// Bundle splitting optimization
export const dynamicImport = async <T>(
  importFunction: () => Promise<{ default: T }>,
  fallback?: T
): Promise<T> => {
  try {
    const moduleResult = await importFunction();
    return moduleResult.default;
  } catch (error) {
    console.warn('Dynamic import failed, using fallback:', error);
    return fallback as T;
  }
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production'
  ) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful:', registration.scope);
      
      // Update service worker when new version is available
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New service worker version available. Please refresh.');
            }
          });
        }
      });
    } catch (error) {
      console.log('ServiceWorker registration failed:', error);
    }
  }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined') {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
    }
  }
};

// Optimize animation performance
export const optimizeAnimations = () => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    // Listen for changes
    prefersReducedMotion.addEventListener('change', () => {
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
        document.documentElement.style.removeProperty('--transition-duration');
      }
    });
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  preloadCriticalResources();
  optimizeImageLoading();
  optimizeAnimations();
  registerServiceWorker();
  
  // Schedule periodic cleanup
  if (typeof window !== 'undefined') {
    setInterval(cleanupMemoryLeaks, 5 * 60 * 1000); // Every 5 minutes
  }
};

// Generate performance report
export const generatePerformanceReport = () => {
  if (typeof window !== 'undefined') {
    const performanceEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');
    
    const report = {
      pageLoad: {
        domContentLoaded: performanceEntries.domContentLoadedEventEnd - performanceEntries.fetchStart,
        fullyLoaded: performanceEntries.loadEventEnd - performanceEntries.fetchStart,
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      },
      renderMetrics: (window as any).__performanceMetrics || [],
    };
    
    console.group('📊 Performance Report');
    console.table(report.pageLoad);
    if (report.renderMetrics.length > 0) {
      const avgRenderTime = report.renderMetrics.reduce((sum: number, metric: any) => sum + metric.renderTime, 0) / report.renderMetrics.length;
      console.log(`Average render time: ${avgRenderTime.toFixed(2)}ms`);
    }
    console.groupEnd();
    
    return report;
  }
  
  return null;
};