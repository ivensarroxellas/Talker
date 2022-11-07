const { readFile, writeFile } = require('fs').promises;
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

const addTalker = async (talker) => {
  const oldTalkers = await getAllTalkers(); 
  
  const takeNewId = oldTalkers[oldTalkers.length - 1].id + 1;
  const addNewTalker = { id: takeNewId, ...talker };
  const newTalkerData = [...oldTalkers, addNewTalker];
  const newJSON = JSON.stringify(newTalkerData, null, 2);
  await writeFile(resolve(__dirname, 'talker.json'), newJSON);
  return newTalkerData[newTalkerData.length - 1];
};

module.exports = {
  getAllTalkers,
  getOneTalker,
  getToken,
  addTalker,
};