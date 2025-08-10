import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
}

// Hook to monitor component performance
export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(0);
  
  useEffect(() => {
    renderStartTime.current = performance.now();
  });
  
  useEffect(() => {
    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;
    
    // Log slow renders in development
    if (process.env.NODE_ENV === 'development' && renderTime > 16) { // 16ms = 60fps threshold
      console.warn(`🐌 Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
    
    // Store metrics for potential analysis
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      (window as any).__performanceMetrics = (window as any).__performanceMetrics || [];
      (window as any).__performanceMetrics.push({
        renderTime,
        componentName,
        timestamp: Date.now()
      });
    }
  });
  
  return renderStartTime.current;
};

// Hook to monitor page load performance
export const usePageLoadMetrics = (pageName: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`📊 ${pageName} - ${entry.name}: ${entry.duration.toFixed(2)}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation'] });
      
      // Cleanup
      return () => observer.disconnect();
    }
  }, [pageName]);
};

// Hook for lazy loading performance
export const useLazyLoadMetrics = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && process.env.NODE_ENV === 'development') {
              console.log(`👁️ Element lazy loaded: ${entry.target.tagName}`);
            }
          });
        },
        { threshold: 0.1 }
      );
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  return observerRef.current;
};