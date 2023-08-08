const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
