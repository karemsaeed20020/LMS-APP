const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createContact, getAllContacts, getAContact, deleteAContact, updateAContact } = require('../controllers/contact.controller');
const contactRouter = express.Router();

contactRouter.route("/").post(authMiddleware, createContact);
contactRouter.route("/").get(getAllContacts);
contactRouter.route("/:id").get(authMiddleware, isAdmin,getAContact);
contactRouter.route("/:id").delete(authMiddleware, isAdmin,deleteAContact);
contactRouter.route("/:id").put(authMiddleware, isAdmin,updateAContact);

module.exports = contactRouter;

