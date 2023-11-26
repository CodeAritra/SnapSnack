const mongoose = require("mongoose");
const { Schema } = mongoose;

const DataSchema = new Schema({
  CategoryName: {
    type: String,
  },

  name: {
    type: String,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("food_items" , DataSchema);
