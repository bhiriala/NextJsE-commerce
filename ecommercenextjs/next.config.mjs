/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.paypalobjects.com",
      },
    ],
  },
};

export default nextConfig;



