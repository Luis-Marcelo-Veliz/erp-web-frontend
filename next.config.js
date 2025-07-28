/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    const isDev = process.env.NODE_ENV !== 'production';
    // En desarrollo usamos la URL de Codespaces; en prod la fija
    const backendBase = isDev
      ? process.env.NEXT_PUBLIC_BACKEND_URL
      : process.env.NEXT_PUBLIC_API_URL;

    return [
      {
        source: '/api/:path*',
        destination: `${backendBase}/api/:path*`,
      },
    ];
  },
};
