const Joi = require('joi');

/* final int id;
final int projectId;
final String? tipo;
final String? descripcion; */

const createRequirement = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    tipo: Joi.string().required(),
    descripcion: Joi.string().required(),
  }),
};

const getRequirements = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
  query: Joi.object().keys({
    tipo: Joi.string(),
    descripcion: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRequirement = {
  params: Joi.object().keys({
    requirementId: Joi.number().integer(),
  }),
};

const updateRequirement = {
  params: Joi.object().keys({
    requirementId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      tipo: Joi.string().required(),
      descripcion: Joi.string().required(),
    })
    .min(1),
};

const deleteRequirement = {
  params: Joi.object().keys({
    requirementId: Joi.number().integer(),
  }),
};

module.exports = {
  createRequirement,
  getRequirements,
  getRequirement,
  updateRequirement,
  deleteRequirement,
};
