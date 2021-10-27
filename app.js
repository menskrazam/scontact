require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const bot = require('./src');
const mode = process.env.NODE_ENV || 'development';
const { checkConfig, getBotVersion } = require('./src/utils');

process.on('exit', (code) => {
  if (code > 0) {
    console.error(`Exit with code: ${code}`);
  }
});

// Check configuration and arguments
const { status, message } = checkConfig();
if (!status) {
  throw new Error(`Some errors founds in environment variables:\r\n${message}`);
}

console.log(`Telegram bot Simple Contact v.${getBotVersion()}`);
console.log('Preparing to start...');

// Setup server
const app = express();
app.use(logger(mode !== 'production' ? 'dev' : 'tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log('Environment is ready.');

const start = async () => {
  const telegramWebhookCallback = await bot();
  app.use(telegramWebhookCallback);
  app.listen(process.env.PORT);
}

(async () => {
  await start();
})();
