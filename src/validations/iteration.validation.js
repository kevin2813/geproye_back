const Joi = require('joi');

/* final int id;
final int projectId;
final String? fechaInicio;
final String? fechaTermino; */

const createIteration = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    fechaInicio: Joi.string().required().isoDate(),
    fechaTermino: Joi.string().required().isoDate(),
  }),
};

const getIterations = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
  query: Joi.object().keys({
    fechaInicio: Joi.string().isoDate(),
    fechaTermino: Joi.string().isoDate(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getIteration = {
  params: Joi.object().keys({
    iterationId: Joi.number().integer(),
  }),
};

const updateIteration = {
  params: Joi.object().keys({
    iterationId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      fechaInicio: Joi.string().required().isoDate(),
      fechaTermino: Joi.string().required().isoDate(),
    })
    .min(1),
};

const deleteIteration = {
  params: Joi.object().keys({
    iterationId: Joi.number().integer(),
  }),
};

module.exports = {
  createIteration,
  getIterations,
  getIteration,
  updateIteration,
  deleteIteration,
};
