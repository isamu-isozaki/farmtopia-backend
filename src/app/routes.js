/**
 * Author: Isamu Isozaki
 */
const router = require('express').Router();

/**
 * User
 */
const userRouter = require('./user/router');
router.use('/user', userRouter);

module.exports = router;