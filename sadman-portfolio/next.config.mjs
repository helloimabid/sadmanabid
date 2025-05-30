// Comment out Cloudflare-specific code for Azure deployment
// import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Azure Static Web Apps static export
  output: "export",
  trailingSlash: true,
  distDir: "out",

  // Optimize images for static export
  images: {
    unoptimized: true,
  },

  // For proper path resolution
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
