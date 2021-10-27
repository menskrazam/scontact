const packageJson = require('../../package.json');

function version () {
  return process.env.npm_package_version ? process.env.npm_package_version : packageJson.version;
}

module.exports = version;
