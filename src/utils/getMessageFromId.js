function getMessageFromId (ctx) {
  const { update: { message: { from: { id = null } = {} } } = {} } = ctx;
  return id;
}

module.exports = getMessageFromId;
