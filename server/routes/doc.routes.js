const express = require("express");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware.js');
const { postDoc, allDoc, getADoc, updateDoc, deleteDoc } = require("../controllers/doc.controller.js");
const docRouter = express.Router();

docRouter.route("/").post(authMiddleware, isAdmin, postDoc);
docRouter.route("/").get(allDoc);
docRouter.route("/:slug").get(getADoc);
docRouter.route("/:id").put(authMiddleware, isAdmin,updateDoc);
docRouter.route("/:id").delete(deleteDoc);

module.exports = docRouter;