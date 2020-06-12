const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
	devServer: {
		compress: true,
		inline: true,
		host: 'localhost',
		port: 3000,
		hot: true,
		overlay: true,
		headers: {"Access-Control-Allow-Origin": "*"},
		historyApiFallback: true,
		contentBase: './dist',
	},
    stats: 'verbose',
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
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/i,
				use: ['file-loader']
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
        })
    ]
}
