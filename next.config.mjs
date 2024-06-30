/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
