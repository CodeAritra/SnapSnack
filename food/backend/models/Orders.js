const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  orderdata: {
    type: Array,
    required: true,
  },

});

module.exports = mongoose.model("orders", OrderSchema);
