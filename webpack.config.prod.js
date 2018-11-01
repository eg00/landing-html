const merge = require('webpack-merge');
const glob = require('glob-all');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: false,
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 5,
                compress: {
                    warnings: true,
                    drop_console: true,
                },
            },
        })]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                preset: [
                    'default',
                    {discardComments: {removeAll: true}}],
            },
            canPrint: true,
        }),

    ],
});
