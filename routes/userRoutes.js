const express = require('express');
const router = express.Router();
const userRouter = require('./../controllers/userControllers');

router.route('/').get(userRouter.getUsers).post(userRouter.createUser);
router
  .route('/:id')
  .get(userRouter.getUser)
  .patch(userRouter.updateUser)
  .delete(userRouter.deleteUser);

module.exports = router;
