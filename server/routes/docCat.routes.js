const express = require("express");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware.js');
const { postDocCat, allDocCats, getADocCat, deleteDocCat, updateDocCat } = require("../controllers/docCart.controller.js");
const docCatRouter = express.Router();

docCatRouter.route("/").post(authMiddleware, isAdmin, postDocCat);
docCatRouter.route("/all").get(allDocCats);
docCatRouter.route("/:slug").get(authMiddleware, isAdmin,getADocCat);
docCatRouter.route("/:id").put(authMiddleware, isAdmin,updateDocCat);
docCatRouter.route("/:id").delete(authMiddleware, isAdmin,deleteDocCat);

module.exports = docCatRouter;