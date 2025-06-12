const express = require('express');
const {Listing} = require("../model/listing");
const wrapAsync = require('../utils/wrapAsync.js');
const {listingSchema, reviewSchema} = require('../joiSchema.js')
const listingValidate = require('../middleware/listingValidate.js')
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn.js");
const isOwner = require('../middleware/isOwner.js');
const { index, newListing, createListing, viewListing, editListing, updateListing, destroyListing, filterListing, searchListings } = require('../controller/listingcontroller.js');
const multer  = require('multer');
const { storage } = require('../cloudCongig.js');
const upload = multer({ storage });



///---------Routes -----------------
router.route("/").get(wrapAsync(index))
.post(isLoggedIn, listingValidate, upload.single('url'), wrapAsync(createListing));
router.get("/new", isLoggedIn, newListing);
router.get("/search", wrapAsync(searchListings));
router.route("/:id").get(listingValidate, wrapAsync(viewListing)).put(isLoggedIn, isOwner,upload.single('url'), listingValidate, wrapAsync(updateListing)).delete( isLoggedIn, isOwner,   wrapAsync(destroyListing));
router.get("/:id/edit",isLoggedIn, isOwner,  listingValidate, wrapAsync(editListing));

module.exports = router;