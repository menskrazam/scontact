const packageJson = require('../../package.json');

module.exports = () => process.env.npm_package_version ? process.env.npm_package_version : packageJson.version;
