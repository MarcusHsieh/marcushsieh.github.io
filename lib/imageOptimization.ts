/**
 * Image Optimization Utilities
 * 
 * This file provides utilities for image optimization recommendations and conversion.
 * For actual conversion, you'll need to use external tools or services.
 */

import { PROJECT_MEDIA_CONFIG, getOptimizationRecommendations } from './mediaLoader';

// Convert file extension to WebP
export const getWebPFilename = (originalFilename: string): string => {
  return originalFilename.replace(/\.(png|jpg|jpeg|heic)$/i, '.webp');
};

// Generate conversion script for CLI tools
export const generateConversionScript = (): string => {
  const recommendations = getOptimizationRecommendations();
  
  if (recommendations.files.length === 0) {
    return '# No images need optimization!';
  }

  let script = `#!/bin/bash
# Image Optimization Script
# This script converts images to WebP format for better performance
# Requirements: cwebp (install via: brew install webp or apt-get install webp)

echo "🖼️ Starting image optimization..."
`;

  recommendations.files.forEach(({ original, recommended }) => {
    const inputPath = `public/${original}`;
    const outputPath = `public/${recommended}`;
    
    script += `
# Convert ${original}
if [ -f "${inputPath}" ]; then
  echo "Converting ${original} to WebP..."
  cwebp -q 80 "${inputPath}" -o "${outputPath}"
  if [ $? -eq 0 ]; then
    echo "✅ Successfully converted ${original}"
    # Optional: Remove original file (uncomment next line)
    # rm "${inputPath}"
  else
    echo "❌ Failed to convert ${original}"
  fi
else
  echo "⚠️ File not found: ${inputPath}"
fi`;
  });

  script += `

echo "🎉 Image optimization completed!"
echo "💡 Remember to update your image references to use the new .webp files"
`;

  return script;
};

// Generate Next.js optimization config
export const generateNextJSOptimizationConfig = (): string => {
  return `
// Add this to your next.config.js for automatic image optimization

const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Enable experimental WebP generation
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
`;
};

// Log conversion instructions
export const logConversionInstructions = (): void => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const recommendations = getOptimizationRecommendations();
    
    if (recommendations.files.length > 0) {
      console.group('🛠️ Image Conversion Instructions');
      console.log('To convert your images to WebP format, you have several options:');
      
      console.log('\n1. 📱 Online Tools:');
      console.log('   • Squoosh.app - Google\'s image compression tool');
      console.log('   • TinyPNG - Also supports WebP conversion');
      console.log('   • Cloudflare Image Resizing - Automatic format optimization');
      
      console.log('\n2. 🖥️ Command Line Tools:');
      console.log('   • Install cwebp: brew install webp (Mac) or apt-get install webp (Linux)');
      console.log('   • Use the generated script below:');
      console.log(generateConversionScript());
      
      console.log('\n3. ⚡ Next.js Automatic Optimization:');
      console.log(generateNextJSOptimizationConfig());
      
      console.log('\n4. 🔧 Sharp (Node.js):');
      console.log('   npm install sharp');
      console.log('   const sharp = require("sharp");');
      console.log('   sharp("input.png").webp({ quality: 80 }).toFile("output.webp");');
      
      console.groupEnd();
    }
  }
};

// Export optimization recommendations for use in build scripts
export const exportOptimizationReport = (): {
  totalFiles: number;
  potentialSavings: string;
  files: Array<{
    path: string;
    currentFormat: string;
    recommendedFormat: string;
    estimatedSavings: string;
  }>;
} => {
  const recommendations = getOptimizationRecommendations();
  
  return {
    totalFiles: recommendations.files.length,
    potentialSavings: recommendations.files.length > 0 ? '25-90%' : '0%',
    files: recommendations.files.map(({ original, recommended, reason }) => ({
      path: original,
      currentFormat: original.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      recommendedFormat: 'WebP',
      estimatedSavings: reason.includes('30-90%') ? '30-90%' : '25-50%'
    }))
  };
};