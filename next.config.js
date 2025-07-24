/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // En desarrollo, TODO /api/... va a localhost:3000/api/...
        destination: 'http://localhost:3000/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
