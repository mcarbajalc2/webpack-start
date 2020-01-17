const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

let config = {
    entry: {
        home: './src/home.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.ejs$/,
                use: ['ejs-loader']
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "./css/[id].css"
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