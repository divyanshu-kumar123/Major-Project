const mongoose = require('mongoose');
const { Listing, CATEGORY_OPTIONS } = require('../model/listing');
require('dotenv').config();
const {data} = require("./data")

main()
  .then(() => {
    console.log("✅ Connected To Mongo Database Successfully");
  })
  .catch(err => console.log("❌ Connection error: ", err));

async function main() {
  await mongoose.connect("mongodb+srv://divyanshu:Divyanshu123%40@cluster0.ogugmyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

const sampleListings = [
  {
    title: "Cozy Cabin in the Mountains",
    description: "Enjoy a peaceful retreat with stunning views and cozy interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      filename: "listing1"
    },
    price: 150,
    location: "Aspen",
    country: "USA",
    category: ["Mountains", "Trending"]
  },
  {
    title: "Modern Apartment in Iconic City",
    description: "A stylish stay located at the heart of an iconic cityscape.",
    image: {
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      filename: "listing2"
    },
    price: 220,
    location: "New York City",
    country: "USA",
    category: ["IconicCity", "Room"]
  },
  {
    title: "Luxury Castle Retreat",
    description: "Live like royalty in this beautifully restored castle estate.",
    image: {
      url: "https://images.unsplash.com/photo-1613553491075-779b3b6b4403",
      filename: "listing3"
    },
    price: 450,
    location: "Loire Valley",
    country: "France",
    category: ["Castles"]
  },
  {
    title: "Lakefront Houseboat Stay",
    description: "Unique houseboat with full amenities and peaceful lake view.",
    image: {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      filename: "listing4"
    },
    price: 180,
    location: "Amsterdam",
    country: "Netherlands",
    category: ["HouseBoats"]
  },
  {
    title: "Dome in the Desert",
    description: "Sleep under the stars in a comfortable desert dome experience.",
    image: {
      url: "https://images.unsplash.com/photo-1613977257594-d88f6a8f2a59",
      filename: "listing5"
    },
    price: 200,
    location: "Joshua Tree",
    country: "USA",
    category: ["Domes", "Camping"]
  },
  {
    title: "Farm Stay with Fresh Air",
    description: "Unplug and reconnect with nature at this countryside farm.",
    image: {
      url: "https://images.unsplash.com/photo-1558864559-70f28e49a26b",
      filename: "listing6"
    },
    price: 95,
    location: "Bavaria",
    country: "Germany",
    category: ["Farms"]
  },
  {
    title: "Luxury Arctic Lodge",
    description: "Experience the northern lights from a warm arctic cabin.",
    image: {
      url: "https://images.unsplash.com/photo-1618221199372-48f5b8e2fa83",
      filename: "listing7"
    },
    price: 350,
    location: "Tromsø",
    country: "Norway",
    category: ["Arctic"]
  },
  {
    title: "Glamping in the Woods",
    description: "All the fun of camping with none of the stress — welcome to glamping!",
    image: {
      url: "https://images.unsplash.com/photo-1590490360183-9be2601f47e2",
      filename: "listing8"
    },
    price: 120,
    location: "Portland",
    country: "USA",
    category: ["Camping", "Trending"]
  },
  {
    title: "Infinity Pool Villa",
    description: "Soak in the view from a private infinity pool villa.",
    image: {
      url: "https://images.unsplash.com/photo-1599423300746-b62533397364",
      filename: "listing9"
    },
    price: 400,
    location: "Ubud",
    country: "Indonesia",
    category: ["AmazingPools"]
  },
  {
    title: "Minimalist Room Downtown",
    description: "Affordable and clean room for solo travelers or couples.",
    image: {
      url: "https://images.unsplash.com/photo-1560448071-0210b3c5c7b2",
      filename: "listing10"
    },
    price: 80,
    location: "Berlin",
    country: "Germany",
    category: ["Room"]
  }
];

const initDb = async () => {
  // await Listing.deleteMany({});
  const ownerId = '6847dce03aa94ebc66a5aaa9'; // Replace with your actual user ID
  const listingsWithOwner = data.map(listing => ({
    ...listing,
    owner: ownerId
  }));
  await Listing.insertMany(listingsWithOwner);
  console.log('✅ Listings seeded successfully');
};

initDb().then(() => mongoose.connection.close());
