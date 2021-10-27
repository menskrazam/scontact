const checkConfig = require('./checkConfig');
const serverUrl = require('./serverUrl');
const getBotVersion = require('./getBotVersion');
const getChatType = require('./getChatType');
const getSubscribersChats = require('./getSubscribersChats');
const getChatId = require('./getChatId');
const getSessionKey = require('./getSessionKey');
const getForwardSenderName = require('./getForwardSenderName');
const getMessageFromId = require('./getMessageFromId');
const isAdmin = require('./isAdmin');

module.exports = {
  checkConfig,
  serverUrl,
  getBotVersion,
  getChatType,
  getSubscribersChats,
  getChatId,
  getSessionKey,
  getForwardSenderName,
  getMessageFromId,
  isAdmin
};
