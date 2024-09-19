const express = require("express");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware.js');
const tutCategoryRouter = express.Router();
const {postTutorialCategory, getAllTutorialCategories, getATutorialCategory, updateATutorialCategory, deleteATutorialCategory} = require("../controllers/tutCategory.controller.js");

tutCategoryRouter.route("/post").post(authMiddleware, isAdmin,postTutorialCategory);
tutCategoryRouter.route("/").get(getAllTutorialCategories);
tutCategoryRouter.route("/:id").get(authMiddleware, isAdmin,getATutorialCategory);
tutCategoryRouter.route("/:id").put(authMiddleware, isAdmin,updateATutorialCategory);
tutCategoryRouter.route("/:id").delete(authMiddleware, isAdmin,deleteATutorialCategory);

module.exports = tutCategoryRouter;