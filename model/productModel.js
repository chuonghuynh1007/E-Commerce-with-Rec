const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  prodName: {
    type: String,
    required: true,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  price: {
    type: String,
  },
  discount: {
    type: String,
  },
  postAt: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,

    default: "Men",

  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
