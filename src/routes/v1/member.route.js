const express = require('express');
const validate = require('../../middlewares/validate');
const memberValidation = require('../../validations/member.validation');
const memberController = require('../../controllers/member.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(validate(memberValidation.createMember), memberController.createMember)
  .get(validate(memberValidation.getMembers), memberController.getMembers);

router
  .route('/:memberId')
  .get(validate(memberValidation.getMember), memberController.getMember)
  .patch(validate(memberValidation.updateMember), memberController.updateMember)
  .delete(validate(memberValidation.deleteMember), memberController.deleteMember);

module.exports = router;
