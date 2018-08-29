var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var extractScssPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

const fileAsset = `name=assets/[name].[hash].[ext]`;

var extractCssPlugin = new ExtractTextPlugin({
    filename: 'vendor.css'
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }]
        }, { // regular css files
          test: /\.css$/,
          loader: extractCssPlugin.extract({
            loader: 'css-loader?importLoaders=1',
          }),
        }, {
            test: /\.scss$/,
            use: extractScssPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.html$/,
            use: ['html-loader?interpolate']
        }, {
            test: /\.(jpg|png)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/',
                    publicPath: 'img/'
                }
            }]
        },
        {
                     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                     use: `url-loader?limit=10000&mimetype=image/svg+xml&${fileAsset}`
                 }]
    },
    plugins: [
        extractCssPlugin,
        extractScssPlugin,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'shared', to: 'shared' }
        ])
    ]
};
