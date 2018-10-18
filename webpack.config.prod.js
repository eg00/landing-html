const cssnano = require('cssnano');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: false,
    mode: 'production',
    optimization: {
        minimize: true,
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: {
                preset: [
                    'default',
                    {discardComments: {removeAll: true}}],
            },
            canPrint: true,
        }),
    ],
});
