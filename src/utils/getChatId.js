module.exports = ({
  update: {
    message: { chat: { id = undefined } = {} } = {},
    edited_message: { chat: { id: edId = 0 } = {} } = {}
  } = {}
}) => id || edId;
