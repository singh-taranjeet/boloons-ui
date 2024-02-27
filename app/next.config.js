// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
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

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
