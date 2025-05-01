import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "picsum.photos" },
        ],
    },
};

export default nextConfig;
