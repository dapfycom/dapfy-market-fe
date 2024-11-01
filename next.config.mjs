import { withContentlayer } from "next-contentlayer";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "d2nqtulf3hrdq8.cloudfront.net" },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default withContentlayer(nextConfig);
