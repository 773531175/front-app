var path = require('path')
var webpack = require('webpack');
var VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const proxyConfig = require('./proxy.config.js');

function getProxy (){
    let proxy = {};
    proxyConfig.forEach(item => {
        proxy[item.api] = {
            target: item.target[process.env.NODE_ENV],
            changeOrigin: true,
        }
    })
    console.log('proxy',proxy)
    return proxy
}

module.exports = merge(baseWebpackConfig, {
    mode: "development",
    devServer: {
        hot: true,
        port: 9090,
        proxy: getProxy()
    },
    optimization: {
        runtimeChunk: 'single'
    },
    plugins: [
        new VueLoaderPlugin(),

        new CleanWebpackPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: './template/index.html'
        })
    ]
})