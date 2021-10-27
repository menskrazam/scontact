module.exports = ({ update: { message: { reply_to_message: { forward_sender_name = '' } = {} } = {} } = {} }) => forward_sender_name;
