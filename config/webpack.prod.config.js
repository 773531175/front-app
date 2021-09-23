var path = require('path')
var webpack = require('webpack');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
// var commonsPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
    merge
} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js')
const fileVersion = new Date().getTime();
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        publicPath: './',
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].min.js',
        chunkFilename: 'js/c[name].min.js?v=' + fileVersion
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ],
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
        usedExports: true,
        concatenateModules: true,
        // cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
        //     //第三方库抽离
        //     vendor: {
        //         chunks: 'all',
        //         name: "vendor",
        //         priority: 10, //权重
        //         test: /[\\/]node_modules[\\/]_?(vue|vue-router)(.*)/,
        //         minSize: 0, //大于0个字节
        //         enforce: true,
        //         reuseExistingChunk: true
        //     },
        // }
    },
    //优化项配置
    plugins: [
        new VueLoaderPlugin(),

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),

        new HtmlWebpackPlugin({
            template: './template/index.html',
            filename: "./index.html",
            inject: false,
            hash: true,
            minify: { //压缩HTML文件
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.DefinePlugin({
            fileVersion: fileVersion //文件版本
        }),

        // new webpack.optimize.UglifyJsPlugin()
    ]
})