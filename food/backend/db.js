const mongoose = require("mongoose");

const mongoURI = URI;

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected");
  
};

module.exports = connectToMongo;
