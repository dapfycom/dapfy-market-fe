/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "picsum.photos" }, { hostname: "dapfy-market-files.s3.eu-north-1.amazonaws.com" }, {
            hostname: "lh3.googleusercontent.com",
        }],
    },
};

export default nextConfig;
