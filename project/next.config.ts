/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cfafdwbhkrjzzmpqmmmo.supabase.co'], // allow this domain
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
   api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

module.exports = nextConfig;

