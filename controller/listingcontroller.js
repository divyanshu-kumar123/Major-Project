const Listing = require("../model/listing");
const { listingSchema, reviewSchema } = require('../joiSchema.js')

//Index Route
module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings })
}

//Add Route
module.exports.newListing = (req, res) => {
    res.render("listings/new.ejs")
}

//create route
module.exports.createListing = async (req, res) => {
    const listing = req.body;
    console.log(listing);
    let result = listingSchema.validate(listing);
    const newListing = new Listing({
        title: listing.title,
        description: listing.description,
        image: { filename: req.file.filename , url:  req.file.path },
        price: listing.price,
        location: listing.location,
        country: listing.country,
        owner: req.user._id
    })
     await newListing.save();
    req.flash("success", "Listing saved successfully");
    res.redirect("/listings")
}

// view Route 
module.exports.viewListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "review", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exist.");
        return res.redirect("/listings")
    }
    res.render("listings/listing.ejs", { listing });
}

//Edit Route
module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist.");
        return res.redirect("/listings")
    }
    let oldListingImage = listing.image.url;
    oldListingImage = oldListingImage.replace("/upload", "/upload/h_300,w_250")
    res.render("listings/edit.ejs", { listing,  oldListingImage});
}

//Update Route
module.exports.updateListing = async (req, res) => {
    const listing = req.body;
    const { id } = req.params;
    const oldListing =await Listing.findById(id);
    const newListing = {
        title: listing.title,
        description: listing.description,
        image: { filename: req.file? req.file.filename : oldListing.image.filename, url: req.file? req.file.path:oldListing.image.url },
        price: listing.price,
        location: listing.location,
        country: listing.country
    };
    await Listing.findByIdAndUpdate(id, newListing);
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
}

//Destroy/Delete Route
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings")
}