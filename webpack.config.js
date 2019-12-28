const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry:{
        //lib: vendors,
        index:  './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, './public'),
       
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000, //端口改为9000
        open:true // 自动打开浏览器，适合懒人
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        compress: true,
        port: 9000,
        open: true,
        proxy:{
            '/': {
                target: '',
                changeOrigin: true,
                bypass: function(req) {
                    if (/\.(gif|jpg|png|woff|svg|eot|ttf|js|jsx|json|css|pdf|xlsx|docx|pptx)$/.test(req.url)){
                        return req.url;
                    }
                }
            }
        }
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                //loader: "happypack/loader?id=babel",
                loader: "babel-loader"
            },
            { test: /\.css|.less$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin({name: 'lib'}),
        //new webpack.optimize.UglifyJsPlugin(),
        //配置缓存，生产的HTML的script指向dist目录
        //参考shttps://segmentfault.com/a/1190000007294861
        new HTMLWebpackPlugin({
            inject: 'body',
            filename: 'index.html',
            hash: true,
            template: './public/index.html'
            // templateContent: function(){
            //     return html;
            // }
        })
    ]
}

