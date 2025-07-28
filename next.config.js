/** @type {import('next').NextConfig} */
const dev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: dev
          ? process.env.NEXT_PUBLIC_BACKEND_URL + '/api/:path*'
          : process.env.NEXT_PUBLIC_API_URL + '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
