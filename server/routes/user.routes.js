const express = require('express');
const { registerAUser, loginAUser, getAllUsers } = require('../controllers/user.controller.js');
const userRouter = express.Router();
// All Post routes 
userRouter.route("/register").post(registerAUser);
userRouter.route('/login').post(loginAUser);

// All Get Routes 
userRouter.route("/all-users").get(getAllUsers)

module.exports = userRouter;