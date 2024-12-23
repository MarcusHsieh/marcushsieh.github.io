/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
    unoptimized: true,
  },
  basePath: "",
  assetPrefix: "",
  webpack(config) {
    config.module.rules.push({
      test: /\.stl$/,
      use: 'file-loader',
    });
    return config;
  },
};

module.exports = nextConfig;