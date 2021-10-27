## Telegram Bot "Simple Contact"

Just lightweight contact bot for Telegram. This bot need active development and in the current version is only MVP.

**NB!** Bot does not support editing messages in this version

**NB!** Before use understand the license.

**NB!** The product is prohibited to use by any government or partially government agencies Republic of Belarus for any purposes. 

### Installation

Create and fill .env file. As example use `.env.example` file.

Run `yarn install` for install all deps.

### Running

Run `yarn run start` for run it in production mode or `yarn run dev` to run in development mode. 

In production mode bot use `SERVER_URL` setting. In development mode bot use localtunnel for connect with telegram server to your computer.

### PM2 manager

Example of json file for PM2 you may find in `./server.json`.

Use `pm2 start ./server.json` for pm2 manager.

