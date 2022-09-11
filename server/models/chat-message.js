const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatMessage = mongoose.model("ChatMessage", chatMessageSchema);
module.exports = chatMessage;
