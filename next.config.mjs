/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  headers: async () => {
    return [
      {
        source: "/api/chat",
        headers: [],
      },
    ];
  },
};

export default nextConfig;
