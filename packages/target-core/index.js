const mrege = require('lodash.merge');
const target = require('./lib/target');
const { version } = require('./package.json');
const platforms = ['wechat', 'alipay', 'swan'];
const defaultOptions = require('./lib/default-options');
module.exports = options => {
    if (!options || !options.platform || platforms.indexOf(options.platform) === -1) {
        throw new Error(`请指定有效的小程序的目标平台（${platforms.join(',')}）`);
    }
    return compiler => {
        compiler.mpTargetOptions = mrege({}, defaultOptions, options);
        target(compiler);
    };
};
module.exports.version = version;
