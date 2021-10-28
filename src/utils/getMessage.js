module.exports = ({
  update: {
    message: m = undefined,
    edited_message: eM = {}
  }
}) => m || eM;
