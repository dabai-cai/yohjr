var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        index: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'target/classes/META-INF/resources/public'),
        filename: "[name].js",
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".tsx",  ".json", ".html"],
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, loaders: ['babel-loader', 'ts-loader'], exclude: [/node_modules/]
            },
            {
                test: /\.jsx?$/, loaders: ['babel-loader'],  exclude: [/node_modules/]
            },
            {
                test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/, loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/, loader: "url-loader?name=[hash:12].[ext]"
            }
        ]
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new HtmlWebpackPlugin({
            title: '首页',
            template: path.resolve(__dirname, 'src/assets/html/layout.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: 'body'
        })
    ]
}

if (process.env.NODE_ENV == 'development') {
    webpackConfig.devtool = 'source-map'
    webpackConfig.devServer = {
        disableHostCheck: true,
        port: 8081,
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8082',
                changeOrigin: true,
                secure: false
            }
        }
    }

}
else if (process.env.NODE_ENV == 'production') {
    webpackConfig.devtool = 'source-map'
    /*
    webpackConfig.plugins.push(new UglifyJsPlugin({
    }))
    */
}

module.exports = webpackConfig
