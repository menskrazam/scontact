const { Telegraf } = require('telegraf');
const LocalSession = require('telegraf-session-local');
const { v4: uuidv4 } = require('uuid');

const DB = process.env.DB || 'session.json';
const {
  serverUrl, getSessionKey
} = require('./utils');
const {
  message: reactionMessage
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
}

async function botInit () {
  bot = new Telegraf(process.env.TOKEN);
  const subscribersSession = new LocalSession({
    database: 'db/subscribersSession.json',
    property: 'subscribersSession',
    getSessionKey: () => 'subscribers'
  })
  bot.use(subscribersSession.middleware());
  const chatsSession = new LocalSession({
    database: 'db/chatsSession.json',
    property: 'chatsSession',
    getSessionKey: getSessionKey
  })
  bot.use(chatsSession.middleware());
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
