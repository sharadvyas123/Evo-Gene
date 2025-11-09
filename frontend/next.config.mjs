/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js NOT to run tsc during the build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
