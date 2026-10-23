/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["three"],
    reactStrictMode: true,
    experimental: {
        agentUpgrade: "security",
    },
};

module.exports = nextConfig;
