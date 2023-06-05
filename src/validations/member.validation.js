const Joi = require('joi');

/* final int id;
final int projectId;
final String? nombre;
final String? cargo; */

const createMember = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    nombre: Joi.string().required(),
    cargo: Joi.string().required(),
  }),
};

const getMembers = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
  query: Joi.object().keys({
    nombre: Joi.string(),
    cargo: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMember = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
    memberId: Joi.number().integer(),
  }),
};

const updateMember = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
    memberId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      nombre: Joi.string().required(),
      cargo: Joi.string().required(),
    })
    .min(1),
};

const deleteMember = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
    memberId: Joi.number().integer(),
  }),
};

module.exports = {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
};
