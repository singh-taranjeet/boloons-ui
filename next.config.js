const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
    ];
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.externals.push({
  //       bufferutil: "bufferutil",
  //       "utf-8-validate": "utf-8-validate",
  //       "supports-color": "supports-color",
  //     });
  //   }

  //   return config;
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
