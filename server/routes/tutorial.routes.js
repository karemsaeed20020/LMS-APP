const express = require("express");
const { postTutorial, getATutorial, updateTutorial, deleteTutorial, allTutorials } = require("../controllers/tutorial.controller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const tutorialRouter = express.Router();

tutorialRouter.route("/").post(authMiddleware, isAdmin, postTutorial);
tutorialRouter.route("/").get(authMiddleware, isAdmin, allTutorials);
tutorialRouter.route("/:id").put(authMiddleware, isAdmin, updateTutorial);
tutorialRouter.route("/:id").delete(authMiddleware, isAdmin, deleteTutorial);
tutorialRouter.route("/:type/:slug").get(getATutorial);

module.exports = tutorialRouter;