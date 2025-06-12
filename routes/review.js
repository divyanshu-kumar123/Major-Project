const express = require('express');
const app = express();
const {Listing} = require("../model/listing");
const Review = require("../model/review.js");
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema, reviewSchema } = require('../joiSchema.js');
const reviewValidate = require('../middleware/reviewValidate.js');
const isLoggedIn = require('../middleware/isLoggedIn.js');
const isReviewAuthor = require('../middleware/isReviewAuthor.js');
const { addReview, destroyReview } = require('../controller/reviewController.js');
const router = express.Router({ mergeParams: true });


// ---Review route----
router.post("/", isLoggedIn, reviewValidate,  wrapAsync(addReview));
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(destroyReview));

module.exports = router;