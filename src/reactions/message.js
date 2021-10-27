const { getChatId, getChatType, getSubscribersChats, getForwardSenderName } = require('../utils');

async function message (ctx, next) {
  const chats = getSubscribersChats(ctx);
  const { chatsSession: { messages = {}, init = false } = {} } = ctx;
  const chatType = getChatType(ctx);

  if (chatType === 'private') {
    const { update: { message: { date: messageDate = null } = {} } = {} } = ctx;
    messages[messageDate] = getChatId(ctx);
    ctx.chatsSession = { ...ctx.chatsSession, messages };
    if (!init) {
      ctx.chatsSession = { ...ctx.chatsSession, init: true };
      await ctx.reply('Спасибо за ваше сообщение. Это сообщение и все последующие сообщения будут пересылаться нам. При первой же возможности мы ответим.');
    }
    for (let i = 0; i < chats.length; i++) {
      await ctx.forwardMessage(chats[i], ctx.from.id, ctx.message.id);
    }
  } else {
    const { update: { message: { reply_to_message: { forward_date = null } = {} } = {} } = {} } = ctx;
    const forwardSenderName = getForwardSenderName(ctx);
    if (messages[forward_date]) {
      await ctx.telegram.copyMessage(messages[forward_date], ctx.message.chat.id, ctx.message.message_id);
    } else {
      if (forwardSenderName && forwardSenderName.length > 0) {
        await ctx.reply(`Не могу связаться с пользователем ${forwardSenderName}`);
      }
    }
  }

  return next();
}

module.exports = message;
