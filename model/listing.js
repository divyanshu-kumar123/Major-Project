const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');
const CATEGORY_OPTIONS = ["Trending", "Room", "IconicCity", "Mountains", "Castles", "AmazingPools", "Camping", "Farms", "Arctic", "Domes", "HouseBoats"]; 

const default_image = "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"

const listingSchema  = new Schema({
    title : {type : String, required : true},
    description : {type : String},
    // image : {type : String, default : default_image, set : (v)=> v === " " ? default_image : v },
    image : {filename : {type : String}, url : {type : String}},
    price : Number,
    location : String,
    country : String,
    review : [
        {
            type: Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: [String],
        enum: {
            values: CATEGORY_OPTIONS,
            message: '{VALUE} is not a supported category'
        },
        default: ["Trending"]
    }
})


listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.review}});
    }
})


// creating listing model (collection in DB)
const Listing = new mongoose.model("Listing" , listingSchema)

module.exports = {Listing, CATEGORY_OPTIONS};