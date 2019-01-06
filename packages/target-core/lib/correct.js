// 矫正webpack配置中的一些可能引起小程序无法运行配置值
module.exports = compiler => {
    const { options } = compiler;
    console.warn(
        '由于小程序不支持动态运行（eval,new Function）js代码，所以需要对devtool配置项或SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin插件的配置数据进行强制修改'
    );
    let isProd = true;
    if (options.mode === 'development') {
        isProd = false;
    }
    options.devtool = isProd ? 'source-map' : 'cheap-source-map';
};
