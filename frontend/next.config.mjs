/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js NOT to run tsc during the build.
  // Recommended to remove this once all type errors are resolved.
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Use ES Module syntax for .mjs files
export default nextConfig;
