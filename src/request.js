const { readFile } = require('fs').promises;
const { resolve } = require('path');


const getAllTalkers = async () => {
  const response = await readFile(resolve(__dirname, './talker.json'), 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};

module.exports = {
  getAllTalkers,
}