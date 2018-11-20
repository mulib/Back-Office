const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
})
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist' // This tells webpack-dev-server to serve the files from the dist directory
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        miniCssExtractPlugin
    ]
};