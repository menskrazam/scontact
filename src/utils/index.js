const checkConfig = require('./checkConfig');
const serverUrl = require('./serverUrl');
const getBotVersion = require('./getBotVersion');
const getChatType = require('./getChatType');
const getChatId = require('./getChatId');
const getForwardSenderName = require('./getForwardSenderName');
const getMessageFromId = require('./getMessageFromId');
const isAdmin = require('./isAdmin');
const getMessageId = require('./getMessageId');
const getFromId = require('./getFromId');
const isReplyToMessage = require('./isReplyToMessage');
const cachePersist = require('./cachePersist');
const getReplyToChatId = require('./getReplyToChatId.js');
const getReplyToFromId = require('./getReplyToFromId.js');
const getReplyToMessageId = require('./getReplyToMessageId.js');
const getForwardDate = require('./getForwardDate');
const getChatKey = require('./getChatKey');
const isEditedMessage = require('./isEditedMessage');
const getMessageType = require('./getMessageType');
const getMessage = require('./getMessage');

module.exports = {
  checkConfig,
  serverUrl,
  getBotVersion,
  getChatType,
  getChatId,
  getForwardSenderName,
  getMessageFromId,
  isAdmin,
  cachePersist,
  getMessageId,
  getFromId,
  isReplyToMessage,
  getReplyToMessageId,
  getReplyToFromId,
  getReplyToChatId,
  getForwardDate,
  getChatKey,
  isEditedMessage,
  getMessageType,
  getMessage
};
