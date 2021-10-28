const getMessageFromId = require('./getMessageFromId');

const ADMIN_ID = process.env.ADMIN_ID || null;

module.exports = (ctx) => !ADMIN_ID ? false : parseInt(ADMIN_ID) === getMessageFromId(ctx);
