module.exports = ({
  update: {
    message: { from: { id = undefined } = {} } = {},
    edited_message: { from: { id: edId = 0 } = {} } = {}
  } = {}
}) => id || edId;
