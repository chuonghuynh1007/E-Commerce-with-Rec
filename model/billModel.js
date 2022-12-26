const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  createBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Product',
        required: true,
      },
    },
  ],
  totalPrice: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;
