/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig