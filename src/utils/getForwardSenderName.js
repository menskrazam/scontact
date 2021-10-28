module.exports = ({
  update: {
    message: { reply_to_message: { forward_sender_name: fN = undefined } = {} } = {},
    edited_message: { reply_to_message: { forward_sender_name: eFN = '' } = {} } = {}
  } = {}
}) => fN || eFN;
