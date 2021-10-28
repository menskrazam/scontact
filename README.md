## Telegram Bot "Simple Contact"

Just lightweight contact bot for Telegram. This bot need active development and in the current version is only MVP.

This project use yarn manager and Node.js >=12.13.0 and prepared to work with PM2

**NB!** The product is prohibited to use by any government or partially government agencies Republic of Belarus for any purposes. 


### Installation

Create and fill .env file. As example use `.env.example` file.

Run `yarn install` for install all deps.

#### .env options

`TOKEN` - telegram bot token from [`@BotFather`](https://t.me/BotFather)

`SERVER_URL` - (optional) url of the server in production mode. Remove if you want use localtunel in production mode.

`PORT` - port of the bot on your server.

`ADMIN_ID` - telegram id of the user who have rights to subscribe groups

`DEFAULT_TTL` - (optional) lifetime in seconds for records messages connections. Remove to use unlimited lifetime.


### Running

Run `yarn run start` for run it in production mode or `yarn run dev` to run in development mode. 

In production mode bot use `SERVER_URL` setting to set server url if need. If you not set it - bot start using localtunnel.
In development mode bot always use localtunnel for connect telegram server to your computer.

#### PM2 manager

Example of json file for PM2 you may find in `./server.json`.

Use `pm2 start ./server.json` for start bot in PM2 manager.


### How to use

1. Create new group

2. Add bot to this group by user what you define in `ADMIN_ID`

3. Write `/subscribe` command

4. When users write message in bot - this messages forward to this group. If users in this group answer to this forward message - this answer send to user in bot.

Enjoy
