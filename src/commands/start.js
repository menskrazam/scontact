const { getChatType } = require('../utils');

async function start (ctx) {
  const chatType = getChatType(ctx);
  if (chatType === 'private') {
    return ctx.replyWithHTML('Бот обратной связи. Просто напишите свое сообщение и оно отправится к нам анонимно.', { disable_web_page_preview: true });
  }
  return ctx.replyWithHTML('Бот обратной связи. подпишите его в тех группах куда он должен доставлять сообщения.', { disable_web_page_preview: true });
}

module.exports = start;
