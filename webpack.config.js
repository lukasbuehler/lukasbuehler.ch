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
            template: "!!handlebars-loader!src/markup/index.hbs"
        }),
        new HtmlWebpackPlugin({
            template: "./src/markup/card.hbs",
            filename: "card/index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/markup/error_pages/404.hbs",
            filename: "error_pages/404.html"
        }),
        new CopyWebpackPlugin([
            {
                from: "src/markup/images",
                to: "images"
            },
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
                test: /\.(handlebars|hbs|moustache)$/, 
                use: "handlebars-loader" 
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.handlebars$/,
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
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
         }
      },
};