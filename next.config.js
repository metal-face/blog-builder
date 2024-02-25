/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["three"],
};
const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
