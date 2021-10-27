const { getSubscribersChats, getChatType, getChatId, isAdmin } = require('../utils');

async function subscribe (ctx) {
  if (isAdmin(ctx)) {
    const chats = getSubscribersChats(ctx);
    const chatType = getChatType(ctx);
    const chatId = getChatId(ctx);
    if (chatId && chatType !== 'private') {
      if (chats.indexOf(chatId) === -1) {
        chats.push(chatId);
        ctx.subscribersSession = { ...ctx.subscribersSession, chats };
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
