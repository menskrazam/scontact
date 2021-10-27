const getMessageFromId = require('./getMessageFromId');

const ADMIN_ID = process.env.ADMIN_ID || null;

function isAdmin (ctx) {
  const messageFromId = `${getMessageFromId(ctx)}`;
  return ADMIN_ID && ADMIN_ID === messageFromId;
}

module.exports = isAdmin;
