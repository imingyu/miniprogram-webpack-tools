const mpTarget = require('@mp-webpack-tools/target-core');
const { version } = require('./package.json');
module.exports = options => {
    options = options || {};
    options.platform = 'swan';
    return mpTarget(options);
};
module.exports.version = version;
