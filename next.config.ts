import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",  
        port: "",
        protocol: "https",
      },
      {
        hostname: "ufs.sh",  
        port: "",
        protocol: "https",
      },
      {
        hostname: "4ax5oe8fka.ufs.sh",  
        port: "",
        protocol: "https",
      }
    ]
  }
};

export default nextConfig;
