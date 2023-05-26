const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const createProject = catchAsync(async (req, res) => {
  const result = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getProjects = catchAsync(async (req, res) => {
  const result = await projectService.getProjects();
  res.send(result);
});

const getProject = catchAsync(async (req, res) => {
  const result = await projectService.getProjectById(req.params.projectId);
  if (!result.data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(result);
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(req.params.projectId, req.body);
  res.send(project);
});

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProjectById(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
