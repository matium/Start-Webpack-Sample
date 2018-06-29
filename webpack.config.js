const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
	// デプロイ時はここを'production'に変更してビルドする
	mode: 'development',
	// メインTSX
	entry: './src/ts/main.tsx',
	// メインJSの出力設定
	output: {
		path: path.resolve(__dirname, 'build/js'),
		filename: '[name].js'
	},
	// Loaderによるタスク処理
	module: {
		rules: [
			// Sassコンパイル
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						// url()で指定した画像は含めない
						options: {url: false}
					},
					{
						loader: 'sass-loader',
						// Compassを含める
						options: {includePaths: ['./node_modules/compass-mixins/lib']}
					}
				]
			},
			// TypeScriptコンパイル
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader',
				exclude: path.resolve(__dirname, 'node_modules')
			},
			// ソースマップ出力
			{
				// enforceにpreを指定してバンドル動作よりも先に実行されるようにする
				test: /\.js$/,
				use: 'source-map-loader',
				enforce: 'pre'
			}
		]	// End rules
	},
	// Pluginの使用
	plugins: [
		// バンドルコードの圧縮
		new UglifyJsPlugin({
			uglifyOptions: {
				// ソースコード内のconsole文をカットする
				compress: {
					drop_console: true
				}
			}
		})
	],
	// TS、TSXを含めるように
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	// TypeScriptソースをソースマップの対象にする
	devtool: 'source-map',
	// Reactは含めない（CDNからダウンロードさせる）
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
};
