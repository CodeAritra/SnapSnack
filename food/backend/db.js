const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/foodapp";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected");
  
};

module.exports = connectToMongo;
