const { getChatType, getChatId, isAdmin, cachePersist: { subscriberSet, subscribers } } = require('../utils');

async function subscribe (ctx) {
  if (isAdmin(ctx)) {
    const chats = await subscribers();
    const chatType = getChatType(ctx);
    const chatId = getChatId(ctx);
    if (chatId && chatType !== 'private') {
      if (chats.indexOf(chatId) === -1) {
        await subscriberSet(chatId);
        chats.push(chatId);
        ctx.reply('Подписано успешно');
      } else {
        ctx.reply('Уже подписано');
      }
    }
  } else {
    ctx.reply('Вы не можете подписать эту группу на сообщения');
  }
}

module.exports = subscribe;
