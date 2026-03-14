import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    strictNullChecks: true,
  },
  eslint: {
    dirs: ["app", "src"],
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

export default nextConfig
