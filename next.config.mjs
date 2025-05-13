/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  headers: async () => {
    return [
      {
        source: "/api/chat",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
