import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/companies/pks-eng',
        destination: '/companies/rozena',
        permanent: true,
      },
      {
        source: '/companies/nextepstudio',
        destination: '/companies/nextep',
        permanent: true,
      },
      {
        source: '/companies/to-be-announced',
        destination: '/companies/noeul',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
