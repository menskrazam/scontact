const getChatType = require('./getChatType');
const getForwardSenderName = require('./getForwardSenderName');

module.exports = (ctx) => {
  if (!ctx.from) return;
  const chatType = getChatType(ctx);
  const { update: { message: { from: { first_name = '', last_name = '' } = {} } = {} } = {} } = ctx;
  const forwardSenderName = getForwardSenderName(ctx);
  if (chatType === 'private') {
    // eslint-disable-next-line camelcase
    return `${first_name} ${last_name}`.trim();
  } else {
    if (forwardSenderName && forwardSenderName.length > 0) {
      return forwardSenderName;
    }
    // eslint-disable-next-line camelcase
    return `${first_name} ${last_name}`.trim();
  }
}
