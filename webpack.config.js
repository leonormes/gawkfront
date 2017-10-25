const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src'),
    buildProduction: path.join(__dirname, '../server/src/public'),
    buildDev: '/build/',
    nodeMod: path.join(__dirname, 'node_modules'),
    publicPath: '/public/',
};

const commonConfig = merge([{
        entry: {
            app: PATHS.app,
        },
        externals: {
            jquery: 'jQuery',
            handlebars: 'handlebars',
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                options: {
                    eslint: {
                        failOnWarning: false,
                        failOnError: true,
                        fix: true,
                    },
                },
            }),
            // new webpack.optimize.ModuleConcatenationPlugin(),
            // new CleanWebpackPlugin(PATHS.buildProduction),
            new ExtractTextPlugin('styles.css'),
            // new FaviconsWebpackPlugin({
            //     logo: './src/images/SeaviewHouse_logo_web (1).png',
            //     emitStats: false,
            //     persistentCache: true,
            //     title: 'Seaview'
            // }),
            new HtmlWebpackPlugin({
                filename: 'views/index.html',
                title: 'Seaview Register',
                template: './src/views/index.html',
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|html)$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
        ],
    },
    parts.lintJavaScript({
        include: PATHS.app,
    }),
    parts.loadJavascript({
        include: PATHS.app,
        exclude: PATHS.nodeMod,
    }),
    parts.loadHandlebars(),
    parts.loadCSS(),
]);

const productionConfig = merge([{
    output: {
        path: PATHS.buildProduction,
        filename: '[name].js',
        publicPath: PATHS.publicPath,
    },
    watch: true,
    stats: {
        children: false,
        errors: true,
        errorDetails: true,

    },
}]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }), {
        output: {
            path: PATHS.buildDev,
            filename: '[name].js',
        },
    },
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }
    return merge(commonConfig, developmentConfig);
};

