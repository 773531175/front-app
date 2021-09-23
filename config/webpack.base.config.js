module.exports = {
    entry:{
        app:['./src/index.js'],
        vendor: ['vue']
    },
    resolve:{
        extensions: ['.js','.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test:/\.scss$/,
                use:[
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test:/\.vue$/,
                use:['vue-loader'],
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 10000,
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 10000,
                            name: 'media/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|woff|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'fonts/[name].[hash:7].[ext]',
                            publicPath: '',
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                loader: "html-loader",
            },
            {
                test: /\.md$/,
                loader: "markdown-loader"
            },
            { 
                test: /\.css$/,
                use: [
                    'vue-style-loader', 
                    'css-loader'
                ]  
            },
        ]
    },
}