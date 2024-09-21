const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createReview, getAllReviews, getAReview, deleteAReview, updateAReview } = require('../controllers/review.controller');
const reviewRouter = express.Router();

reviewRouter.route("/").post(authMiddleware, createReview);
reviewRouter.route("/").get(getAllReviews);
reviewRouter.route("/:id").get(authMiddleware, isAdmin,getAReview);
reviewRouter.route("/:id").delete(authMiddleware, isAdmin,deleteAReview);
reviewRouter.route("/:id").put(authMiddleware, isAdmin,updateAReview);

module.exports = reviewRouter;

