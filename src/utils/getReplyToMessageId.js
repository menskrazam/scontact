module.exports = ({
  update: {
    message: { reply_to_message: { message_id: mId = undefined } = {} } = {},
    edited_message: { reply_to_message: { message_id: eMid = 0 } = {} } = {}
  } = {}
}) => mId || eMid;
