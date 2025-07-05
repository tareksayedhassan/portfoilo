/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // لإيقاف Turbopack وتشغيل Webpack
  },
};

module.exports = nextConfig;
