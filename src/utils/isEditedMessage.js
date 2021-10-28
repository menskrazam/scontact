// eslint-disable-next-line camelcase
module.exports = ({ update: { edited_message = undefined } = {} }) => !!edited_message;
