/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization for static export
  images: {
    loader: "akamai",
    path: "",
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  basePath: "",
  assetPrefix: "",
  
  webpack(config, { dev, isServer }) {
    // Add STL file support
    config.module.rules.push({
      test: /\.stl$/,
      use: 'file-loader',
    });
    
    // Bundle analyzer in development (only if available)
    if (!dev && !isServer && process.env.ANALYZE) {
      try {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analysis.html'
          })
        );
      } catch (error) {
        console.log('Bundle analyzer not available, skipping...');
      }
    }
    
    return config;
  },
};

module.exports = nextConfig;