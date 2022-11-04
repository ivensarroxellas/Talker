const { readFile } = require('fs').promises;
const { resolve } = require('path');


const getAllTalkers = async () => {
  const response = await readFile(resolve(__dirname, './talker.json'), 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};

const getOneTalker = async (id) => {
  const response = await readFile(resolve(__dirname, './talker.json'), 'utf8');
  const talker = JSON.parse(response).filter((item) => +item.id === +id);
  return talker;
};

module.exports = {
  getAllTalkers,
  getOneTalker,
}