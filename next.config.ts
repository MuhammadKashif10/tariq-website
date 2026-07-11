import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical URLs never carry a trailing slash (matches absoluteUrl()).
  trailingSlash: false,

  // Serve modern formats for all next/image output (local assets only).
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Preferred host: apex (non-www). Permanently redirect www → apex.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fastjunkservicedubai.com" }],
        destination: "https://fastjunkservicedubai.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
