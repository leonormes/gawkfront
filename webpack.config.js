const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, '../gawk-firebase/src/public')
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
