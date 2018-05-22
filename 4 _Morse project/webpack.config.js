const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports =(env)=>{
    return {
        context: path.resolve(__dirname,'src'),
        entry: {
            main: "./index.js",
            vendor:['kefir']
        },
        output: {
            filename: "[name].[chunkhash].js",
            path:path.resolve(__dirname,'public')
        },
        watch: true,
        devtool: env && env.dev?"eval":"source-map",
        devServer: {
            port:8080,
        },
        module: {
            rules: [
                {
                    test:/\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets:['env',"es2015",'stage-0','react'],
                            plugins: ["babel-plugin-transform-runtime"]

                        }

                    }
                },
                {
                    test:/\.scss$/,
                    use:ExtractTextPlugin.extract({
                        use:[
                            {loader:'css-loader',
                                options:{
                                    modules:true,
                                    localIdentName: '[local]--[hash:base64:5]'
                                }
                            },
                            {loader:'sass-loader'},
                            {loader:'autoprefixer-loader'}
                        ],
                        fallback: 'style-loader'
                    })
                },
                {
                    test:/\.(jpe?g|png|gif|svg)$/,
                    use:{
                        loader:'url-loader',
                        options: {
                            limit:8000,
                            name:'[path][name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name:['vendor','manifest']
            }),
            new HtmlWebpackPlugin({
                title:'FastBoilerplate',
                template:'./index.html'
            }),
            new ExtractTextPlugin('[name].[chunkhash].css'),
        ],
        resolve: {
            extensions: ['.js','.json','.jsx','*']
        }
    }
}

