import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: [
      "drive.google.com",
      "lh3.googleusercontent.com",
      "https://placehold.net",
    ],
    unoptimized: true,
  },
}

export default nextConfig
