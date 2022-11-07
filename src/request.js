const { readFile } = require('fs').promises;
const { resolve } = require('path');
const crypto = require('crypto');

const getAllTalkers = async () => {
  const response = await readFile(resolve(__dirname, './talker.json'), 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};

const getOneTalker = async (id) => {
  const response = await readFile(resolve(__dirname, './talker.json'), 'utf8');
  const talker = JSON.parse(response).find((item) => +item.id === +id);
  return talker;
};

const getToken = async () => {
  const result = { token: crypto.randomBytes(8).toString('hex') };
  return result;
};

module.exports = {
  getAllTalkers,
  getOneTalker,
  getToken,
};