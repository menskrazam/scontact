const storage = require('node-persist');

const DEFAULT_TTL = process.env.DEFAULT_TTL || false;
const SUBSCRIBERS_KEY = 'botSubscribers';
const CHAT_STAT_KEY = 'chatStat';

storage.init({
  dir: './db',
  tll: DEFAULT_TTL
})
  .then(() => console.log('Cache ready'))
  .catch(e => console.log(`Cache error: ${e}`));

const set = async (key, value, ttl = DEFAULT_TTL) => storage.setItem(key, value, { ttl });

const get = async (key) => storage.getItem(key);

const has = async (key) => !!await get(key);

const del = async (key) => storage.removeItem(key);

const update = async (key, value, ttl = DEFAULT_TTL) => storage.updateItem(key, value, { ttl });

const search = async (pattern) => storage.valuesWithKeyMatch(new RegExp(`${pattern}`));

const setOrUpdate = async (key, value, ttl = DEFAULT_TTL) => await has(key)
  ? update(key, value, ttl)
  : set(key, value, ttl);

const chatStatSet = async (chatId, options) => setOrUpdate(`${CHAT_STAT_KEY}|${chatId}`, { ...await get(`${CHAT_STAT_KEY}|${chatId}`) || {}, ...options });

const chatStatGet = async (chatId) => get(`${CHAT_STAT_KEY}|${chatId}`);

const chatStatDel = async (chatId) => del(`${CHAT_STAT_KEY}|${chatId}`);

const subscriberSet = async (chatId) => {
  const data = await subscribers();
  const index = data.indexOf(chatId);
  if (index > -1) {
    return data;
  }
  return set(SUBSCRIBERS_KEY, [...data, chatId], false);
};

const subscriberDel = async (chatId) => {
  const data = await subscribers();
  const index = data.indexOf(chatId);
  if (index === -1) {
    return data;
  }
  data.splice(index, 1);
  return set(SUBSCRIBERS_KEY, data, false);
};

const subscribers = async () => await get(SUBSCRIBERS_KEY) || [];

module.exports = {
  set,
  get,
  update,
  search,
  setOrUpdate,
  has,
  del,
  chatStatSet,
  chatStatGet,
  chatStatDel,
  subscribers,
  subscriberSet,
  subscriberDel
};
