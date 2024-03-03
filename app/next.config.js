// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/games/sum-addict/join",
        destination: "/games/sum-addict",
      },
      {
        source: "/games/sum-addict/create",
        destination: "/games/sum-addict",
      },
      {
        source: "/games/sharp/join",
        destination: "/games/sharp",
      },
      {
        source: "/games/sharp/create",
        destination: "/games/sharp",
      },
    ];
  },
};

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = withPWA(nextConfig);
// module.exports = nextConfig;
