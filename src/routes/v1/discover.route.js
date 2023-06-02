const express = require('express');
const validate = require('../../middlewares/validate');
const discoverValidation = require('../../validations/discover.validation');
const discoverController = require('../../controllers/discover.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(discoverValidation.createChatUser), discoverController.createChatUser)
  .get(validate(discoverValidation.getChatUsers), discoverController.getChatUsers);

module.exports = router;
