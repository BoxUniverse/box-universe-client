/** @type {import("next").NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, '/src/styles/')],
  },
  productionBrowserSourceMaps: true,

  images: {
    domains: ['boxuniverse.s3.ap-southeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boxuniverse.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '*',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        net: false,
        tls: false,
        bufferutil: false,
        'utf-8-validate': false,
      };
    }
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};

module.exports = nextConfig;
