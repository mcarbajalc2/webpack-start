const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
var webpack = require('webpack');

let config = {
    entry: {
        home: './src/home.js',
        login: './src/login.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000&name=../fonts/[hash].[ext]' 
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{url: true}
                    },
                    'sass-loader'                    
                ]
            },
            {
                test: /\.ejs$/,
                use: ['ejs-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "./css/[id].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
        })  
    ]
};

const files = glob.sync(process.cwd() + '/src/*.ejs');
files.forEach(file => {    
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: file,
            filename: path.basename(file).replace('.ejs','.html')
        })
    );
});

module.exports = config;