module.exports = ({
  update: {
    message: { message_id: id = undefined } = {},
    edited_message: { message_id: edId = 0 } = {}
  } = {}
}) => id || edId;
