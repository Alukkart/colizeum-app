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
};

export default nextConfig;
