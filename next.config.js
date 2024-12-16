/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
    serverExternalPackages: ["@meshsdk/core", "@meshsdk/core-cst", "@meshsdk/react"],
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "placekitten.com",
            },
            {
                hostname: "gerowallet.io",
            },
            { hostname: "firebasestorage.googleapis.com" },
            { hostname: "ipfs.blockfrost.dev" },
        ],
    },
    webpack: function (config, options) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        // Remove critical dependancy warning
        config.plugins.push(
            new webpack.ContextReplacementPlugin(/@emurgo[\\/\\]cardano-serialization-lib-browser/, (data) => {
                data.dependencies.map((d) => delete d.critical);
                return data;
            })
        );
        return config;
    },
};
module.exports = nextConfig;
