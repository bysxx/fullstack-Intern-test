/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: false,
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
    viewTransition: true,
  },
};

module.exports = nextConfig;
