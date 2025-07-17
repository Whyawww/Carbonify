/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walhi.or.id',
      },
      {
        protocol: 'https',
        hostname: 'www.wwf.id',
      },
    ],
  },
};

export default nextConfig;