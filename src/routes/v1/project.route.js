const express = require('express');
const validate = require('../../middlewares/validate');
const projectValidation = require('../../validations/project.validation');
const projectController = require('../../controllers/project.controller');
const iterationRouter = require('./iteration.route');
const requirementRouter = require('./requirement.route');
const memberRouter = require('./member.route');

const router = express.Router();
router.use('/:projectId/iteration', iterationRouter);
router.use('/:projectId/requirement', requirementRouter);
router.use('/:projectId/member', memberRouter);

router
  .route('/')
  .post(validate(projectValidation.createProject), projectController.createProject)
  .get(validate(projectValidation.getProjects), projectController.getProjects);

router
  .route('/:projectId')
  .get(validate(projectValidation.getProject), projectController.getProject)
  .patch(validate(projectValidation.updateProject), projectController.updateProject)
  .delete(validate(projectValidation.deleteProject), projectController.deleteProject);

module.exports = router;
