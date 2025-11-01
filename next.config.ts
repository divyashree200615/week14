import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Ignore ESLint errors during builds (both local & Vercel)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
