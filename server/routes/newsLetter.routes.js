const express = require('express');
const { subscribe, unsubscribe } = require('../controllers/newsLetter.controller.js');

const newsLetterRouter = express.Router();

newsLetterRouter.route("/").post(subscribe);
newsLetterRouter.route("/:id").delete(unsubscribe);

module.exports = newsLetterRouter;