import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import * as initDataModule from './data.js';
const initData = initDataModule.default || initDataModule;
import * as ListingModule from '../model/listing.js';
const Listing = ListingModule.default || ListingModule;

main()
.then(()=>{
    console.log("Connected To Mongo Database Successfully");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}
const initDb = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner : '6847dc5625e8fc2430781da2'}));
    await Listing.insertMany(initData.data);
    console.log('Data was initialized');
}
await initDb();

