const tokenVerify = async (req, res, next) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameVerify = async (req, res, next) => {
  const { body: { name } } = req;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
    if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageVerify = async (req, res, next) => {
  const { body: { age } } = req;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
    if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkVerify = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const watchedAtVerify = async (req, res, next) => {
  const { body: { talk: { watchedAt } } } = req;
  const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dataRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateVerify = async (req, res, next) => {
  const { body: { talk: { rate } } } = req;

  if (rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (Number(rate) % 1 !== 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  tokenVerify,
  nameVerify,
  ageVerify,
  talkVerify,
  watchedAtVerify,
  rateVerify,
};