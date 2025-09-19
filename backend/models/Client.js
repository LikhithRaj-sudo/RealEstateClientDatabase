const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  budget: { type: Number },
  interest: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Client", ClientSchema);