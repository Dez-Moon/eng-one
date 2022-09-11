const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: "USER" | "ADMIN",
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  img: {
    type: String,
  },
  status: "online" | "offline",
  wasOnline: { type: String },
  passwordRecoveryCode: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
