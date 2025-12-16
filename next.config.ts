import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d381oh62lm94pz.cloudfront.net",
        pathname: "/transformed/**",
      },
      {
        protocol: "https",
        hostname: "d381oh62lm94pz.cloudfront.net",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
