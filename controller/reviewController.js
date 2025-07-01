const Review = require("../model/review.js");
const {Listing} = require("../model/listing");

// addReview Route
module.exports.addReview = async(req, res)=>{
    const {id} = req.params;
    const {review} = req.body;
    const listing = await Listing.findById(id);
    const newReview = new Review(review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review posted successfully");
    res.redirect(`/listings/${id}`);
  }

    // Delete Review Route
module.exports.destroyReview = async (req, res)=>{
    const{id, reviewId} = req.params;
    const listing =await Listing.findByIdAndUpdate(id, {$pull : {review : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${id}`);
  }