const express = require('express');
const validate = require('../../middlewares/validate');
const iterationValidation = require('../../validations/iteration.validation');
const iterationController = require('../../controllers/iteration.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(validate(iterationValidation.createIteration), iterationController.createIteration)
  .get(validate(iterationValidation.getIterations), iterationController.getIterations);

router
  .route('/:iterationId')
  .get(validate(iterationValidation.getIteration), iterationController.getIteration)
  .patch(validate(iterationValidation.updateIteration), iterationController.updateIteration)
  .delete(validate(iterationValidation.deleteIteration), iterationController.deleteIteration);

module.exports = router;
