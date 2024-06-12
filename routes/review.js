const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
const reviewController = require("../controllers/reviews")



router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview))

router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyreview))

module.exports = router;