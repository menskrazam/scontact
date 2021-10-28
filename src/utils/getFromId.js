module.exports = ({
  update: {
    message: { from: { id = undefined } = {} } = {},
    edited_message: { from: { id: eId = 0 } = {} } = {}
  }
}) => id || eId;
