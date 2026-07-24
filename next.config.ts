import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.clinicgeo.co.kr",
          },
        ],
        destination: "https://clinicgeo.co.kr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
