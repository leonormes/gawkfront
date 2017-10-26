const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, '../server/src/public')
};

module.exports = {
    watch: true,
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Seaview Register',
            template: './src/views/index.html'
        }),
        new workboxPlugin({
            globDirectory: PATHS.build,
            globPatterns: ['**/*.{html,js,css}'],
            swDest: path.join(PATHS.build, 'sw.js'),
          })
    ],
    module: {
        rules: [
            {
                test: /\.handlebars$/, loader: "handlebars-loader"
            }
        ]
    }
};
