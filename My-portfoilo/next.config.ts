import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  api: {
    bodyParser: false,
  },
};

module.exports = nextConfig;
