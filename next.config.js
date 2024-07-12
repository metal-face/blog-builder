/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["three"],
    reactStrictMode: true,
};
const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
