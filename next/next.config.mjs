/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Suppress React warnings and errors in production build
      config.optimization.minimizer = config.optimization.minimizer.map((plugin) => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions = {
            ...plugin.options.terserOptions,
            compress: {
              ...plugin.options.terserOptions.compress,
              warnings: false,
            },
            output: {
              ...plugin.options.terserOptions.output,
              comments: false,
            },
          };
        }
        return plugin;
      });
    }

    return config;
  },
};

export default nextConfig;
