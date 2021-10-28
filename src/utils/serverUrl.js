const localtunnel = require('localtunnel');

const SERVER_URL = process.env.SERVER_URL || false;
let url = SERVER_URL ? SERVER_URL.replace(/\/$/, '') : '';

(async () => {
  if (process.env.NODE_ENV !== 'production' || !SERVER_URL) {
    const check = 0;
    // eslint-disable-next-line no-unmodified-loop-condition
    while (!localtunnel) {
      await new Promise(resolve => {
        if (check < 30) {
          setTimeout(resolve, 1000);
        } else {
          throw new Error('Timeout for localtunnel initialization');
        }
      });
    }
    const tunnel = await localtunnel({ port: process.env.PORT });
    console.log(`Localtunnel initialization on ${tunnel.url}`);
    url = tunnel.url.replace(/\/$/, '');
  }
  if (process.env.NODE_ENV === 'production' && SERVER_URL) {
    console.log(`Production mode detected. Initialization on ${url}`);
  }
})();

async function serverUrl () {
  const prodUrl = SERVER_URL ? SERVER_URL.replace(/\/$/, '') : '';
  if (process.env.NODE_ENV === 'production' && SERVER_URL) {
    return prodUrl;
  }
  const check = 0;
  // eslint-disable-next-line no-unmodified-loop-condition
  while (url === prodUrl) {
    await new Promise(resolve => {
      if (check < 45) {
        setTimeout(resolve, 1000);
      } else {
        throw new Error('Timeout for localtunnel url generation');
      }
    });
  }
  return url;
}

module.exports = serverUrl;
