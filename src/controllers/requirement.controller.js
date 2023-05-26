const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { requirementService } = require('../services');

const createRequirement = catchAsync(async (req, res) => {
  req.body = {
    ...req.body,
    "projectId": req.params.projectId
  }
  const result = await requirementService.createRequirement(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getRequirements = catchAsync(async (req, res) => {
  const result = await requirementService.getRequirements(req.params.projectId);
  res.send(result);
});

const getRequirement = catchAsync(async (req, res) => {
  const result = await requirementService.getRequirementById(req.params.requirementId);
  if (!result.data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Requirement not found');
  }
  res.send(result);
});

const updateRequirement = catchAsync(async (req, res) => {
  const requirement = await requirementService.updateRequirementById(req.params.requirementId, req.body);
  res.send(requirement);
});

const deleteRequirement = catchAsync(async (req, res) => {
  await requirementService.deleteRequirementById(req.params.requirementId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRequirement,
  getRequirements,
  getRequirement,
  updateRequirement,
  deleteRequirement,
};
