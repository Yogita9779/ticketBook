/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "images.squarespace-cdn.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.thestandard.co.zw", pathname: "/**" },
      { protocol: "https", hostname: "www.logupdateafrica.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
