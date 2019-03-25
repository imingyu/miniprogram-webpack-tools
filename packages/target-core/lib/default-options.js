const globalObjectName = {
    wechat: 'global',
    alipay: 'my',
    swan: 'global'
};
module.exports = {
    replaceWebpack: {
        output: {
            globalObject: (compiler, platform) => {
                return globalObjectName[platform];
            },
        },
        devtool: compiler => {
            return compiler.options.mode === 'development' ? 'cheap-source-map' : 'source-map';
        },
        node: {
            console: false,
            global: false,
            process: false,
            __filename: 'mock',
            __dirname: 'mock',
            Buffer: false,
            setImmediate: false
        }
    }
};
