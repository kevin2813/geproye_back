const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { memberService } = require('../services');

const createMember = catchAsync(async (req, res) => {
  req.body = {
    ...req.body,
    "projectId": req.params.projectId
  }
  const result = await memberService.createMember(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getMembers = catchAsync(async (req, res) => {
  const result = await memberService.getMembers(req.params.projectId);
  res.send(result);
});

const getMember = catchAsync(async (req, res) => {
  const result = await memberService.getMemberById(req.params.memberId);
  if (!result.data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }
  res.send(result);
});

const updateMember = catchAsync(async (req, res) => {
  const member = await memberService.updateMemberById(req.params.memberId, req.body);
  res.send(member);
});

const deleteMember = catchAsync(async (req, res) => {
  await memberService.deleteMemberById(req.params.memberId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
};
