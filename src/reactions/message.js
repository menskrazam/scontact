const {
  getChatId, getChatType, getMessageId, isReplyToMessage, getChatKey, getForwardSenderName,
  cachePersist: {
    chatStatGet, chatStatSet, chatStatDel, subscribers, setOrUpdate, get
  }
} = require('../utils');

async function privateChat (ctx, next) {
  const chatId = getChatId(ctx);
  const { init = false } = await chatStatGet(chatId) || {};
  if (!init) {
    await chatStatSet(chatId, { init: true });
    await ctx.reply('Спасибо за ваше сообщение. Это сообщение и все последующие сообщения будут пересылаться нам. При первой же возможности мы ответим.');
  }
  const cacheKey = getChatKey(ctx);
  await setOrUpdate(cacheKey, chatId);
  const chats = await subscribers();
  for (let i = 0; i < chats.length; i++) {
    try {
      await ctx.forwardMessage(chats[i], ctx.from.id, ctx.message.id);
    } catch (e) {
      console.error(e);
    }
  }
  return next();
}

async function groupChat (ctx, next) {
  const replyToMessage = isReplyToMessage(ctx);
  if (!replyToMessage) {
    return next();
  }
  const chatId = getChatId(ctx);
  const messageId = getMessageId(ctx);
  const cacheKey = getChatKey(ctx);
  const replyToChatId = await get(cacheKey) || 0;
  if (replyToMessage) {
    try {
      await ctx.telegram.copyMessage(replyToChatId, chatId, messageId);
    } catch (e) {
      if (typeof e === 'object') {
        const forwardSenderName = getForwardSenderName(ctx);
        const { response: { ok = false, error_code: ec = 0 } = { ok: false, error_code: 0 } } = e;
        if (ec === 403) {
          if (forwardSenderName && forwardSenderName.length > 0) {
            await ctx.reply(`Не могу связаться с пользователем ${forwardSenderName}. Он закрыл бот.`);
            await chatStatDel(replyToChatId);
          }
        }
        if (!ok && ec !== 403) {
          console.error(e);
          await ctx.reply(`Неизвестная ошибка отправки пользователю ${forwardSenderName}`);
        }
      } else {
        console.error(e);
      }
    }
  }
  return next();
}

module.exports = async (ctx, next) => getChatType(ctx) === 'private' ? privateChat(ctx, next) : groupChat(ctx, next);
