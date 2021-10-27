const localtunnel = process.env.NODE_ENV !== 'production'
  ? require('localtunnel') // eslint-disable-line node/no-unpublished-require
  : undefined;

let url = process.env.SERVER_URL.replace(/\/$/, '');

(async () => {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'provisioning') {
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
    console.log(`Developer mode detected. Localtunnel initialization on ${tunnel.url}`);
    url = tunnel.url.replace(/\/$/, '');
  } else {
    if (process.env.NODE_ENV === 'production') {
      console.log(`Production mode detected. Initialization on ${url}`);
    }
  }
})();

async function serverUrl () {
  const prodUrl = process.env.SERVER_URL.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'provisioning') {
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
