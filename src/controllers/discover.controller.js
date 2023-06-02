const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { discoverService } = require('../services');

const createChatUser = catchAsync(async (req, res) => {
  const result = discoverService.createChatUser(req.app, req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getChatUsers = catchAsync(async (req, res) => {
  const result = discoverService.getChatUsers(req.app);
  res.send(result);
});

module.exports = {
  createChatUser,
  getChatUsers,
};
