const { getBotVersion, getChatType } = require('../utils');

async function help (ctx) {
  const version = getBotVersion() ? ` версии v.${getBotVersion()}` : '';
  const chatType = getChatType(ctx);
  if (chatType === 'private') {
    return ctx.replyWithHTML(`Телеграм-бот <b>Simple Contact</b>${version}

Пользоваться мной просто - я бот обратной связи. Просто напишите свое сообщение.`, { disable_web_page_preview: true });
  }
  return ctx.replyWithHTML(`Телеграм-бот <b>Simple Contact</b>${version}

Пользоваться мной просто - я бот обратной связи. Просто ответьте на нужное сообщение пользователя.`, { disable_web_page_preview: true });
}

module.exports = help;
