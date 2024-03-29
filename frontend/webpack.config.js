const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const cssLoaders = [
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1
        }
    },
    'sass-loader'
]

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: ['./js/index.jsx', './css/style.scss']
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        publicPath: 'assets/',
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: '/(node_modules|bower_components)/',
                use: ['react-hot-loader/webpack', 'babel-loader', 'eslint-loader']
            },
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                options: {
                    outputPath: 'fonts'
                },
                loader: 'file-loader'
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'img'
                        },
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            outputPath: 'img',
                            enabled: true,
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { removeDesc: true },
                                        { removeXMLNS: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../public'),
        overlay: false,
        hot: true,
        port: 8000,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: 'index.html' },
            ]
        }
    },
    devtool: 'eval-cheap-module-source-map'
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.module.rules.push({
            test: /\.(sc|c|sa)ss$/i,
            use: ['style-loader', ...cssLoaders]
        })
    }

    if (argv.mode === 'production') {
        config.module.rules.push({
            test: /\.(sc|c|sa)ss$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                ...cssLoaders,
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer'),
                            require('cssnano')
                        ]
                    }
                },
            ]
        })
        config.plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }))
        config.plugins.push(new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!uploads/**'],
        }))
    }

    return config
}
