const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
},{versionKey: false});

module.exports = mongoose.model("Wish", wishSchema);
