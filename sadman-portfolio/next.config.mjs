/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: "standalone" for Vercel - it's not needed
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "i.ibb.co", // Fixed domain without extra .com
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // Fixed domain
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
