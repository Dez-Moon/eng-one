const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const Token = mongoose.model("Video", videoSchema);

module.exports = Token;
