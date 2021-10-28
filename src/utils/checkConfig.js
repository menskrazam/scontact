function checkConfig () {
  const errors = [];

  if (!process.env.TOKEN) {
    errors.push('TOKEN for telegram bot must be provided!');
  }

  if (!process.env.PORT) {
    console.log('PORT not provided. Use default 80 port.');
  }

  if (!process.env.SERVER_URL) {
    console.log('SERVER_URL not provided. Use localtunnel.');
  }

  if (!process.env.ADMIN_ID) {
    errors.push('ADMIN_ID must be provided!');
  }

  if (process.env.DEFAULT_TTL) {
    console.log(`Cache TLL set to ${process.env.DEFAULT_TTL}`);
  } else {
    console.log(`Cache TLL is unlimited. Use DEFAULT_TTL setting to change it`);
  }

  return errors.length === 0
    ? {
        status: true,
        message: null
      }
    : {
        status: false,
        message: errors.join('\r\n')
      };
}

module.exports = checkConfig;
