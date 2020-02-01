const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development', // 开发模式
    entry: path.resolve(__dirname, '../src/main_express.js'), // 入口文件
    // entry: {
    //     main: __dirname + "../src/main_express.js",
    // },
    devtool: "inline-source-map",
    output: {
        filename: "[name].[hash:2].js", // 打包后的文件名称
        path: path.resolve(__dirname, "../dist/express") // 打包后的目录
    },
    target: "node",
    plugins: [
        new CleanWebpackPlugin(),

    ],
    module: {
        rules: [

        ]
    },
}