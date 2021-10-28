module.exports = ({
  update: {
    message: m = undefined,
    edited_message: eM = {}
  }
}) => {
  const {
    text = undefined,
    caption = undefined,
    photo = undefined,
    animation = undefined,
    audio = undefined,
    document = undefined,
    video = undefined
  } = m || eM;
  if (photo || animation || audio || document || video) {
    return 'media';
  } else if (caption) {
    return 'caption';
  } else if (text) {
    return 'text';
  }
  return false;
};
