const Joi = require('joi');

const createChatUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    ip: Joi.string().ip({
      version: [
        'ipv4',
        'ipv6'
      ],
      cidr: 'optional'
    }),
  }),
};

const getChatUsers = {
  query: Joi.object().keys({
    email: Joi.string().email(),
    ip: Joi.string().ip({
      version: [
        'ipv4',
        'ipv6'
      ],
      cidr: 'optional'
    }),
  }),
};

module.exports = {
  createChatUser,
  getChatUsers
};
