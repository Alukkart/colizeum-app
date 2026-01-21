import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
    turbopack: {
        resolveAlias: {
            '@prisma/client/runtime/library': '@prisma/client/runtime/client',
        },
    },
    async rewrites() {
        return [
            {
                source: '/admin/:path*',
                destination: '/api/admin-proxy/:path*',
            },
        ]
    },
};

export default nextConfig;
