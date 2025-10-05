const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: String,
  amount: Number,
  daily: Number,
  secret: Number
});

module.exports = mongoose.model("Salary", SalarySchema);
