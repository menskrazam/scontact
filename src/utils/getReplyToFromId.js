module.exports = ({
  update: {
    message: { reply_to_message: { from: { id = undefined } = {} } = {} } = {},
    edited_message: { reply_to_message: { from: { id: eId = 0 } = {} } = {} } = {}
  } = {}
}) => id || eId;
