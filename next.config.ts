/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  eslint: {
    // Only use this if you want to deploy despite warnings
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig