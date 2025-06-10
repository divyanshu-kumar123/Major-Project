const Review = require("../model/review");
const isReviewAuthor = async (req, res, next)=>{
    const { reviewId } = req.params;
    const  currReview = await Review.findById(reviewId);
    if (currReview && !currReview.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you don't have access to do this");
        return  res.redirect(`/listings/${req.params.id}`);
      }
      next();
}

module.exports = isReviewAuthor;