const { Telegraf } = require('telegraf');
const { v4: uuidv4 } = require('uuid');

const { serverUrl } = require('./utils');
const {
  message: reactionMessage,
  editedMessage: reactionEditedMessage
} = require('./reactions');
const {
  start: commandStart,
  help: commandHelp,
  subscribe: commandSubscribe,
  unsubscribe: commandUnsubscribe
} = require('./commands');

let botServerUrl;
let bot;
const endpoint = uuidv4();

function botEvents () {
  // Commands

  // Start command
  bot.command('start', (ctx) => {
    return commandStart(ctx);
  });

  // Help command
  bot.command('help', (ctx) => {
    return commandHelp(ctx);
  });

  // Subscribe command
  bot.command('subscribe', (ctx) => {
    return commandSubscribe(ctx);
  });

  // Unsubscribe command
  bot.command('unsubscribe', (ctx) => {
    return commandUnsubscribe(ctx);
  });

  // Reactions

  // Get message
  bot.on('message', async (ctx, next) => {
    return reactionMessage(ctx, next);
  });

  // Get edited message
  bot.on('edited_message', async (ctx, next) => {
    return reactionEditedMessage(ctx, next);
  });
}

async function botInit () {
  bot = new Telegraf(process.env.TOKEN);
  if (process.env.NODE_ENV !== 'production') {
    bot.use(Telegraf.log());
  }
  botServerUrl = await serverUrl().catch((e) => {
    throw new Error(`Error with webhook: ${e}`);
  });
  await bot.telegram.setWebhook(`${botServerUrl}/${endpoint}`).catch((e) => {
    throw new Error(`Error with webhook: ${e}`);
  });
  botEvents();
}

const useTelegram = async () => {
  console.log('Try to start bot.');
  await botInit();
  console.log(`Run bot on port ${process.env.PORT} and with hook on ${botServerUrl}/${endpoint}`);
  return bot.webhookCallback(`/${endpoint}`);
};

module.exports = useTelegram;
