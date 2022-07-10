/*const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports =  {
    entry:'./src/index.js',
    output: {
        filename:'./bundle.js'
    },
    module:{
        rules:[
           {
                test:/\.js$/,
                exclude:/node_modules/,
                use:["babel-loader"],
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(sass|scss)$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"sass-loader"}
                ]
            }
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"src","index.html")
        })
    ],
};
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require("./package.json");
var copyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry:{
        index:path.resolve(__dirname,"src/app/index.js"),
        vendor:Object.keys(package.dependencies),
        contact:path.resolve(__dirname,"src/app/contact.js"),
        services:path.resolve(__dirname,"src/app/services.js")
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].bundle.js",
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:["babel-loader"],
            },
            {
                test:/\.(sass|scss)$/,
                exclude:/node_modules/,
                use:[
                    {loader:"style-loader"},// Adds CSS to the DOM by injecting a `<style>` tag
                    {loader:"css-loader"},// Adds CSS to the DOM by injecting a `<style>` tag
                    {loader:"sass-loader"} //loads a sass/scss file and comples it to css
                ]
            },
            {
                test:/\.(png|jp(e*)g|svg)$/,
                use:[{
                    loader:"url-loader",
                    options:{
                            limit:8000,
                            name:"images/[hash]-[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            hash:true,
            template:__dirname+"/src/index.html",
            title: "Erskinne",
            inject:"body",
            filename:"index.html",
            chunks:["vendor","index"],
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
        }),
        new HtmlWebpackPlugin({
            hash:true,
            template:__dirname+"/src/services.html",
            title: "Erskinne | Services",
            inject:"body",
            filename:"services.html",
            chunks:["vendor","services"],
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
        }),
        new HtmlWebpackPlugin({
            hash:true,
            template:__dirname+"/src/contact.html",
            title: "Erskinne",
            inject:"body",
            filename:"contact.html",
            chunks:["vendor","contact"],
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
        }),      
        new copyWebpackPlugin({
            patterns: [
                { from: 'src/images', to: 'images' },
              ],
            })
    ],
}