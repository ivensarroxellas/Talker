const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers, getOneTalker, getToken, addTalker, editTalker } = require('./request');
const { emailVerify, passwordVerify } = require('./LoginVerify');
const { tokenVerify, nameVerify, ageVerify, talkVerify,
   watchedAtVerify, rateVerify } = require('./tokenValidation');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(200).json(talkers);
});

app.post('/talker', tokenVerify, nameVerify, ageVerify,
 talkVerify, watchedAtVerify, rateVerify, async (req, res) => {
  const { body } = req;
  const add = await addTalker(body);
  res.status(201).json(add);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getOneTalker(id);
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
    res.status(200).json(talker);
});

app.put('/talker/:id', tokenVerify, nameVerify, ageVerify, talkVerify,
watchedAtVerify, rateVerify, async (req, res) => {
  const { params: { id }, body } = req;
  const retorno = await editTalker(id, body);
  res.status(200).json(retorno);
});

app.post('/login', emailVerify, passwordVerify, async (_req, res) => {
    res.status(200).json(await getToken());
});
