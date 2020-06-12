const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle-[hash].min.js",
		libraryTarget: "var",
		library: "Client"
	},
    module: {
        rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: 'file-loader',
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
			hash: true,
			xhtml: true
        }),
		new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
		new MiniCssExtractPlugin({
		  filename: "[name].css",
		  chunkFilename: "[id].css"
		}),
    ]
}
