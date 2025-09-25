/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cfafdwbhkrjzzmpqmmmo.supabase.co'], // allow this domain
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: __dirname,
  },


module.exports = nextConfig;

