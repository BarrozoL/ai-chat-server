const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, default: null },
  sender: { type: String, enum: ["user", "ai"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
