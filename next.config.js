/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            // En desarrollo, apunta al backend local en el puerto 3000
            ? 'http://localhost:3000/api/:path*'
            // En producción (Render, Vercel, etc.) sigue apuntando a tu URL desplegada
            : 'https://erp-web-backend-l6at.onrender.com/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
