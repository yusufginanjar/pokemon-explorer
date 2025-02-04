import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"], // Add domain for images
  },
};

export default nextConfig;
