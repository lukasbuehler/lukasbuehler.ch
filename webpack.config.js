const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/scripts/index.ts',
    plugins: [
        new CleanWebpackPlugin(["tmp"]),
        new HtmlWebpackPlugin({
            template: "./src/markup/index.html"
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/resources',
                to: 'resources'
            },
            {
                from: 'src/lang',
                to: 'lang'
            },
            {
                from: 'src/scripts/loadCards.php',
                to: 'loadCards.php'
            }
        ]),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ],
    devtool: 'inline-source-map',
    devServer: 
    {
        contentBase: './tmp'
    },
    output: 
    {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'tmp'),
        //publicPath: "./"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                              },
                              optipng: {
                                enabled: false,
                              },
                              pngquant: {
                                quality: '65-90',
                                speed: 4
                              },
                              gifsicle: {
                                interlaced: false,
                              }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
      },
};