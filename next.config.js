/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Apunta al backend desplegado en Render:
        destination: 'https://erp-web-backend-l6at.onrender.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
