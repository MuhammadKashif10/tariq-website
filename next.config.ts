import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical URLs never carry a trailing slash (matches absoluteUrl()).
  trailingSlash: false,

  // Serve modern formats for all next/image output (local assets only).
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // NOTE: www ↔ apex canonicalization is intentionally NOT done here.
  // On Vercel the canonical-host redirect is owned by the platform (the domain
  // you mark as "primary" in Project → Domains). Adding an app-level redirect
  // that points the opposite way to Vercel's produces an infinite 308 loop
  // (ERR_TOO_MANY_REDIRECTS). Set the apex "fastjunkservicedubai.com" as the
  // primary domain in the Vercel dashboard so it matches the app's canonical
  // (site.domain), and Vercel will redirect www → apex for you.
};

export default nextConfig;
