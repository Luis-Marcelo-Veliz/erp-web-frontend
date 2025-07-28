/\*\* @type {import('next').NextConfig} \*/
const dev = process.env.NODE\_ENV !== 'production';

const nextConfig = {
async rewrites() {
return \[
{
source: '/api/\:path\*',
destination: dev
? process.env.NEXT\_PUBLIC\_BACKEND\_URL + '/api/\:path\*'
: process.env.NEXT\_PUBLIC\_API\_URL + '/api/\:path\*',
},
];
},
};

module.exports = nextConfig;
