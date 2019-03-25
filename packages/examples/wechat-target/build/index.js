const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const mpTarget = require('../../../target-core/index');
const webpackConfig = {
    mode: 'none',
    target: mpTarget({
        platform: 'wechat'
    }),
    // devtool: 'cheap-source-map',
    // target: 'web',
    entry: {
        'js/app': path.resolve(__dirname, '../src/app.js'),
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
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /(node_modules)/,
                    name: 'js/vendor',
                    chunks: 'initial'
                },
                common: {
                    name: 'js/common',
                    minChunks: 2
                }
            }
        },
        runtimeChunk: {
            name: 'js/runtime'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise']
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: '**/*.wxml'
                },
                {
                    from: '**/*.json'
                },
                {
                    from: '**/*.wxss'
                }
            ],
            {
                context: path.resolve(__dirname, '../src')
            }
        )
    ]
};
webpack(webpackConfig).run(function(err, stats) {
    console.log(
        stats.toString({
            colors: true
        })
    );
});
