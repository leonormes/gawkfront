const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, '../server/src/public')
};

module.exports = {
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
