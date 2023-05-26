const express = require('express');
const validate = require('../../middlewares/validate');
const requirementValidation = require('../../validations/requirement.validation');
const requirementController = require('../../controllers/requirement.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(validate(requirementValidation.createRequirement), requirementController.createRequirement)
  .get(validate(requirementValidation.getRequirements), requirementController.getRequirements);

router
  .route('/:requirementId')
  .get(validate(requirementValidation.getRequirement), requirementController.getRequirement)
  .patch(validate(requirementValidation.updateRequirement), requirementController.updateRequirement)
  .delete(validate(requirementValidation.deleteRequirement), requirementController.deleteRequirement);

module.exports = router;
