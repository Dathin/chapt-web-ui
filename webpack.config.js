const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const buildPath = 'public';

let config = {

	entry: {
		login: ['./src/ts/controller/UserLoginController.ts', './src/scss/pages/login.scss'],
		chat: ['./src/ts/controller/ChatController.ts', './src/scss/pages/chat.scss'],
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, buildPath),
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	devServer: {
		contentBase: buildPath,
		open: true,
		liveReload: true,
		port: 9000,
		disableHostCheck: true,
		index: 'login.html',
	},
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000
	},

	performance: {
		hints: false
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			myPageHeader: 'Login',
			chunks: ['login'],
			template: './src/html/login.html',
			filename: './login.html',
			minify: true,
		}),
		new HtmlWebpackPlugin({
			myPageHeader: 'Chat',
			chunks: ['chat'],
			template: './src/html/chat.html',
			filename: './chat.html',
			minify: true,
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			path: path.resolve(__dirname, buildPath),
			publicPath: './',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: './src/assets',
					to: './assets',
				}
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
};
module.exports = config;
