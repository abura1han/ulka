/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "YOUR_CDN_HOST_NAME",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
