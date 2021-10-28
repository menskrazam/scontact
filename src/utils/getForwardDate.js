module.exports = ({
  update: {
    message: { reply_to_message: { forward_date: fD = 0 } = {} } = {},
    edited_message: { reply_to_message: { forward_date: eFD = 0 } = {} } = {}
  } = {}
}) => fD || eFD;
