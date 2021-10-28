const { slugify } = require('transliteration');

const getChatType = require('./getChatType');
const getForwardSenderName = require('./getForwardSenderName');
const getForwardDate = require('./getForwardDate');

const slug = (string) => `chat|${slugify(string, {
  separator: '|', lowercase: true, unknown: '?'
})}`;

module.exports = (ctx) => {
  const chatType = getChatType(ctx);
  const {
    update: {
      message = false,
      edited_message = {}
    } = {}
  } = ctx;
  // eslint-disable-next-line camelcase
  const { from: { first_name: firstName = '', last_name: lastName = '' } = {}, date = 0 } = message || edited_message;
  if (chatType === 'private') {
    // eslint-disable-next-line camelcase
    return slug(`${firstName} ${lastName} ${date}`);
  } else {
    const forwardSenderName = getForwardSenderName(ctx);
    const forwardDate = getForwardDate(ctx);
    if (forwardSenderName && forwardSenderName.length > 0) {
      return slug(`${forwardSenderName} ${forwardDate}`);
    }
    // eslint-disable-next-line camelcase
    return slug(`${firstName} ${lastName} ${date}`);
  }
}
