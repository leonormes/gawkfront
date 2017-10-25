exports.devServer = ({host, port} = {}) => ({
		devServer: {
			historyApiFallback: true,
			stats: 'errors-only',
			host,
			port,
			overlay: {
				errors: true,
				warnings: true
			},
		},
});

exports.lintJavaScript = ({include, exclude, options}) => ({
		module: {
			rules: [
				{
					test: /\.js$/,
					include,
					exclude,
					enforce: 'pre',
					loader: 'eslint-loader',
					options,
				},
			],
		},
});

exports.loadJavascript = ({include, exclude}) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
			},
		],
	},
});

exports.loadHandlebars = () => ({
	module: {
		rules: [
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader'
			},
		],
	},
});

exports.loadCSS = ({include, exclude} = {}) => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				include,
				exclude,
				use: ['style-loader', 'css-loader']
			},
		],
	},
});
