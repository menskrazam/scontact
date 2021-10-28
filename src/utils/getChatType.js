module.exports = ({
  update: {
    message: { chat: { type = undefined } = {} } = {},
    edited_message: { chat: { type: edT = '' } = {} } = {}
  } = {}
}) => type || edT;
