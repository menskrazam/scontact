function checkConfig () {
  const errors = [];

  if (!process.env.TOKEN) {
    errors.push('TOKEN for telegram bot must be provided!');
  }

  if (!process.env.PORT) {
    errors.push('PORT for telegram bot must be provided!');
  }

  if (!process.env.SERVER_URL) {
    errors.push('SERVER_URL for telegram bot must be provided!');
  }

  if (!process.env.ADMIN_ID) {
    errors.push('ADMIN_ID must be provided!');
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
