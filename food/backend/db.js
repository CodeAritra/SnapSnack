const mongoose = require("mongoose");

const mongoURI = process.env.URI;

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected");
};

module.exports = connectToMongo;
