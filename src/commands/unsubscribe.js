const { getChatType, getChatId, isAdmin, cachePersist: { subscriberDel, subscribers } } = require('../utils');

async function unsubscribe (ctx) {
  if (isAdmin(ctx)) {
    const chats = await subscribers();
    const chatType = getChatType(ctx);
    const chatId = getChatId(ctx);
    if (chatId && chatType !== 'private') {
      if (chats.indexOf(chatId) > -1) {
        await subscriberDel(chatId);
        return ctx.reply('Отписано успешно');
      } else {
        return ctx.reply('Не подписано');
      }
    }
  } else {
    ctx.reply('Вы не можете отписать эту группу от сообщений');
  }
}

module.exports = unsubscribe;
