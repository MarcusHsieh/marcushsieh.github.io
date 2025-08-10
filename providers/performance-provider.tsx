"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { initializePerformanceOptimizations, generatePerformanceReport } from '@/lib/performanceOptimizations';

interface PerformanceContextType {
  generateReport: () => any;
}

const PerformanceContext = createContext<PerformanceContextType>({
  generateReport: () => null,
});

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    // Initialize performance optimizations when the app loads
    initializePerformanceOptimizations();
    
    // Add global performance report function for debugging
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      (window as any).generatePerformanceReport = generatePerformanceReport;
      console.log('🚀 Performance monitoring initialized. Run generatePerformanceReport() in console for metrics.');
    }
    
    // Report initial performance metrics
    const reportTimeout = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Initial performance report:');
        generatePerformanceReport();
      }
    }, 2000); // Wait 2s for initial page load
    
    return () => {
      clearTimeout(reportTimeout);
    };
  }, []);
  
  const contextValue: PerformanceContextType = {
    generateReport: generatePerformanceReport,
  };
  
  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}