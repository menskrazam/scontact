module.exports = ({
  update: {
    message: { reply_to_message: { chat: { id = undefined } = {} } = {} } = {},
    edited_message: { reply_to_message: { chat: { id: eId = 0 } = {} } = {} } = {}
  } = {}
}) => id || eId;
