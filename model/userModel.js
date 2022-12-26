const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Trader",
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Incorrect format for email",
    },
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
