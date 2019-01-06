const path = require('path');
const webpack = require('webpack');
const mpTarget = require('@mp-webpack-tools/target-core');
const webpackConfig = {
    mode: 'none',
    target: mpTarget({
        platform: 'wechat'
    }),
    // devtool: 'cheap-source-map',
    // target: 'web',
    entry: {
        app: path.resolve(__dirname, '../src/app.js'),
        'pages/index/index': path.resolve(__dirname, '../src/index.js'),
        'pages/logs/logs': path.resolve(__dirname, '../src/logs.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
webpack(webpackConfig).run(function(err, stats) {
    console.log(
        stats.toString({
            colors: true
        })
    );
});
