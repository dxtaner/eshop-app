const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    toJSON: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});



const User = mongoose.model("user", UserSchema);

module.exports = User;
