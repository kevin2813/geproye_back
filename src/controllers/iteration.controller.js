const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { iterationService } = require('../services');

const createIteration = catchAsync(async (req, res) => {
  req.body = {
    ...req.body,
    "projectId": req.params.projectId
  }
  const result = await iterationService.createIteration(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getIterations = catchAsync(async (req, res) => {
  const result = await iterationService.getIterations(req.params.projectId);
  res.send(result);
});

const getIteration = catchAsync(async (req, res) => {
  const result = await iterationService.getIterationById(req.params.iterationId);
  if (!result.data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Iteration not found');
  }
  res.send(result);
});

const updateIteration = catchAsync(async (req, res) => {
  const iteration = await iterationService.updateIterationById(req.params.iterationId, req.body);
  res.send(iteration);
});

const deleteIteration = catchAsync(async (req, res) => {
  await iterationService.deleteIterationById(req.params.iterationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createIteration,
  getIterations,
  getIteration,
  updateIteration,
  deleteIteration,
};
