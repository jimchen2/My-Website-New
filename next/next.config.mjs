/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Do not ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Do not ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
