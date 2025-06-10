const Listing = require("../model/listing")
const isOwner = async (req, res, next)=>{
    const { id } = req.params;
    const currListing = await Listing.findById(id);
    if (currListing && !currListing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you don't have access to do this");
        return  res.redirect(`/listings/${id}`);
      }
      next();
}

module.exports = isOwner;