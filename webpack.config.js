const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const Stylish = require('webpack-stylish');

const generateHTMLPlugins = () =>
    glob.sync('./src/**/*.html').map(dir =>
            new HtmlWebpackPlugin({
                filename: path.basename(dir), // Output
                template: dir,
                meta: [
                    {
                        name: 'viewport',
                        content: 'user-scalable=no, width=device-width, initial-scale=1',
                    },
                    {
                        'http-equiv': 'Content-Type',
                        content: 'text/html; charset=utf-8',
                    },
                ],
            }),
        new HtmlBeautifyPlugin({
            config: {
                html: {
                    end_with_newline: true,
                    indent_size: 2,
                    indent_with_tabs: false,
                    indent_inner_html: true,
                    preserve_newlines: true,
                    unformatted: ['p', 'i', 'b', 'span'],
                },
            },
            replace: [' type="text/javascript"'],
        }),
    );

module.exports = {
    entry: [
        './src/js/index.js',
        './src/scss/style.scss',
    ],
    output: {
        filename: './js/scripts.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        // hot: true,
        // inline: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                modules: false,
                            }],
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist:  ['last 2 versions']
                                }),
                                require('cssnano')({
                                    preset: [
                                        'default', {
                                            discardComments: {
                                                removeAll: true,
                                            },
                                        }],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html/includes'),
                use: ['raw-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: './css/style.bundle.css',
            // filename: './css/[name].css',
            filename: './css/[name].[hash:5].css',
            chunkFilename: '[id].css',
        }),

        new CopyWebpackPlugin([
            {
                from: './src/fonts',
                to: './fonts',
            },
            {
                from: './src/favicon',
                to: './favicon',
            },
            {
                from: './src/img',
                to: './img',
            },
            {
                from: './src/uploads',
                to: './uploads',
            },
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: { optimizationLevel: 7 },
            gifsicle: { optimizationLevel: 3 },
            pngquant: { quality: '65-90', speed: 4 },
            svgo: {
                plugins: [
                    { removeUnknownsAndDefaults: false },
                    { cleanupIDs: false },
                    { removeViewBox: false },
                ],
            },
            plugins: [imageminMozjpeg({ quality: 75 })],
        }),
        ...generateHTMLPlugins(),
        new Stylish(),
    ],

};

