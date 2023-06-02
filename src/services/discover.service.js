const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

const createChatUser = (app, discoverBody) => {
  const users = app.get('chatUsers');
  if(users.find(elem => elem.ip === discoverBody.ip)) {
    logger.info('Error: el usuario ya esta en la lista');
    return { error: 'El usuario ya esta en la lista'};
  }
  logger.info(JSON.stringify(discoverBody));
  
  users.push(discoverBody);

  return discoverBody;
};

const getChatUsers = (app) => {
  const lista = app.get('chatUsers');
  
  logger.info(JSON.stringify(lista));
  
  return lista;
};

module.exports = {
  createChatUser,
  getChatUsers,
};
