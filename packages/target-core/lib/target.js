const mrege = require('lodash.merge');
const defaultOptions = require('./default-options');
const webpack = require('webpack');
const JsonpTemplatePlugin = require('webpack/lib/web/JsonpTemplatePlugin');
const FetchCompileWasmTemplatePlugin = require('webpack/lib/web/FetchCompileWasmTemplatePlugin');
const NodeSourcePlugin = require('webpack/lib/node/NodeSourcePlugin');
const FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');
// const ExternalsPlugin = require('webpack/lib/ExternalsPlugin');
module.exports = compiler => {
    const webpackOptions = compiler.options;
    const { platform, replaceWebpack } = compiler.mpTargetOptions;
    // 是否覆盖webpack的一些配置项已达到兼容小程序
    if (replaceWebpack) {
        // 由于小程序不支持动态运行（eval,new Function）js代码，所以需要覆盖devtool配置项
        // 小程序限制详情见：<运行限制>一节，https://developers.weixin.qq.com/miniprogram/dev/framework/details.html
        if (replaceWebpack.devtool) {
            const type = typeof replaceWebpack.devtool;
            if (type === 'function') {
                webpackOptions.devtool = replaceWebpack.devtool(compiler, platform);
            } else if (type === 'string') {
                webpackOptions.devtool = replaceWebpack.devtool;
            } else {
                webpackOptions.devtool = replaceWebpack.devtool;
            }
        }

        // 小程序不需要兼容node里的一些变量，故不需要webpack对node进行的polyfill或mock
        // 但是开发者也有可能需要其中的某项mock(如__filename)可自己设置node配置项
        // 本库默认保留__filename，__dirname
        // node配置说明详见：https://webpack.docschina.org/configuration/node/
        if (replaceWebpack.node) {
            if (replaceWebpack.node === true) {
                webpackOptions.node = Object.assign({}, defaultOptions.node);
            } else if (typeof replaceWebpack.node === 'object') {
                webpackOptions.node =
                    typeof webpackOptions.node === 'object'
                        ? mrege({}, webpackOptions.node, replaceWebpack.node)
                        : replaceWebpack.node;
            } else if (typeof replaceWebpack.node === 'function') {
                webpackOptions.node = replaceWebpack.node(compiler, platform);
            } else {
                webpackOptions.node = replaceWebpack.node;
            }
        }

        if (replaceWebpack.output) {
            webpackOptions.output = webpackOptions.output || {};
            if (replaceWebpack.output.globalObject) {
                webpackOptions.output.globalObject =
                    typeof replaceWebpack.output.globalObject === 'function'
                        ? replaceWebpack.output.globalObject(compiler, platform)
                        : replaceWebpack.output.globalObject;
            }
        }
    }
    new JsonpTemplatePlugin().apply(compiler);
    new FetchCompileWasmTemplatePlugin({
        mangleImports: webpackOptions.optimization.mangleWasmImports
    }).apply(compiler);

    new FunctionModulePlugin().apply(compiler);

    new NodeSourcePlugin(webpackOptions.node).apply(compiler);
    // new ExternalsPlugin('global', '').apply(compiler);

    const loaderTargetName = `mpwpt-${platform}`;
    new webpack.LoaderTargetPlugin(loaderTargetName).apply(compiler);
};
