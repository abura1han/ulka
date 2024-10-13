/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_CDN_URL.replace('https://', ''),
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
