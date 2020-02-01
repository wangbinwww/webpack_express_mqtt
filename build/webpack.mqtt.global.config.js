const path = require('path');
const nodeExternals = require('webpack-node-externals')

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development', // 开发模式
    entry: path.resolve(__dirname, '../src/main_mqtt_user.js'), // 入口文件
    output: {
        filename: "[name].[hash:2].js", // 打包后的文件名称
        path: path.resolve(__dirname, "../dist/mqtt"), // 打包后的目录
    },
    target: "node",
    plugins: [
        new CleanWebpackPlugin(),

    ],
    externals: [
        nodeExternals()
    ],



}