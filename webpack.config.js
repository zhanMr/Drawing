const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const os = require('os');

function getHost(){
    const interfaces = os.networkInterfaces();
    const local = '127.0.0.1';
    let ip;
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i = 0; i < iface.length; i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== local && !alias.internal){
                ip = alias.address;
                break;
            }
        }
    }
    return ip || local;
}
module.exports = {
    // mode: 'production',
    // devtool: 'source-map',
    entry:{
        //lib: vendors,
        index:  './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, './public'),
       
    },
    // devServer: {
    //     contentBase: path.join(__dirname, "dist"),
    //     port: 9000, //端口改为9000
    //     open:true // 自动打开浏览器，适合懒人
    // },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        compress: true,
        // port: 9000,
        open: true,
        //host: '192.168.1.104',
        //host: getHost(),
        // proxy:{
        //     '/': {
        //         target: '',
        //         changeOrigin: true,
        //         bypass: function(req) {
        //             if (/\.(gif|jpg|png|woff|svg|eot|ttf|js|jsx|json|css|pdf|xlsx|docx|pptx)$/.test(req.url)){
        //                 return req.url;
        //             }
        //         }
        //     }
        // }
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

