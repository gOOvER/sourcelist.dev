const path = require("path");

const mode = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const openBrowser = process.env.OPEN_BROWSER !== 'false';

module.exports = {
    entry: {
        app: [
            "./src/index.js"
        ],
    },
    output: {
        filename: mode === 'production' ? "[name].[contenthash:8].js" : "[name].js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/",
        clean: true,
        assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
    },
    mode: mode,
    devtool: mode === 'development' ? "eval-source-map" : "source-map",
    target: ['web', 'es2022'],
    devServer: {
        port: port,
        open: openBrowser,
        historyApiFallback: {
            index: "index.html"
        },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        hot: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
        },
    },
    optimization: {
        minimize: mode === 'production',
        splitChunks: false,
    },
    performance: {
        hints: mode === 'production' ? 'warning' : false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};