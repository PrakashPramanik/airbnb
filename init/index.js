const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map( (obj)=> ({...obj,owner: "6665827a2bef477b230d0607"}))
    await Listing.insertMany(initData.data);
    console.log("data inserted");
};

initDB();