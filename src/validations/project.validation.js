const Joi = require('joi');

/* final int id;
final String? nombre;
final String? fechaInicio;
final String? fechaTermino;
final String? estado; */

const createProject = {
  body: Joi.object().keys({
    nombre: Joi.string().required(),
    fechaInicio: Joi.string().required().isoDate(),
    fechaTermino: Joi.string().required().isoDate(),
    estado: Joi.string().required().valid('Creado', 'En Curso', 'Terminado'),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    nombre: Joi.string(),
    fechaInicio: Joi.string().isoDate(),
    fechaTermino: Joi.string().isoDate(),
    estado: Joi.string().valid('Creado', 'En Curso', 'Terminado'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      nombre: Joi.string().required(),
      fechaInicio: Joi.string().required().isoDate(),
      fechaTermino: Joi.string().required().isoDate(),
      estado: Joi.string().required().valid('Creado', 'En Curso', 'Terminado'),
    })
    .min(1),
};

const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.number().integer(),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
