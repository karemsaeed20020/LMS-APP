const express = require('express');
const { registerAUser, loginAUser, getAllUsers, updateUser, deleteUser, getAUser, blockUser, unblockUser, updatePassword } = require('../controllers/user.controller.js');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware.js');
const userRouter = express.Router();
// All Post routes 
userRouter.route("/register").post(registerAUser);
userRouter.route('/login').post(loginAUser);

// All Get Routes 
userRouter.route("/all-users").get( getAllUsers);
userRouter.route("/:id").get(authMiddleware, getAUser);

// all put routes
userRouter.route('/update-profile').put(authMiddleware,updateUser);
userRouter.route('/block/:id').put(authMiddleware,isAdmin,blockUser);
userRouter.route('/unblock/:id').put(authMiddleware,isAdmin,unblockUser);
userRouter.route('/update-password').put(authMiddleware,updatePassword);

// all delete routes 
userRouter.route('/:id').delete(authMiddleware, isAdmin, deleteUser);

module.exports = userRouter;