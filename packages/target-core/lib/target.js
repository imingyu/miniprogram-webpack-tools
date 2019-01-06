const webpack = require('webpack');
const JsonpTemplatePlugin = require('webpack/lib/web/JsonpTemplatePlugin');
const FetchCompileWasmTemplatePlugin = require('webpack/lib/web/FetchCompileWasmTemplatePlugin');
const NodeSourcePlugin = require('webpack/lib/node/NodeSourcePlugin');
const FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');

const correct = require('./correct');
module.exports = compiler => {
    const { options } = compiler;
    const loaderTargetName = 'web'; //`mpts-${compiler.mpTargetOptions.platform}`;
    correct(compiler);
    new JsonpTemplatePlugin().apply(compiler);
    new FetchCompileWasmTemplatePlugin({
        mangleImports: options.optimization.mangleWasmImports
    }).apply(compiler);

    new FunctionModulePlugin().apply(compiler);
    new NodeSourcePlugin(options.node).apply(compiler);
    new webpack.LoaderTargetPlugin(loaderTargetName).apply(compiler);
};
