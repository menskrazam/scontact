const { getSubscribersChats, getChatType, getChatId, isAdmin } = require('../utils');

async function unsubscribe (ctx) {
  if (isAdmin(ctx)) {
    const chats = getSubscribersChats(ctx);
    const chatType = getChatType(ctx);
    const chatId = getChatId(ctx);
    if (chatId && chatType !== 'private') {
      if (chats.indexOf(chatId) > -1) {
        ctx.subscribersSession = {
          ...ctx.subscribersSession,
          chats: chats.filter(id => id !== chatId)
        };
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
