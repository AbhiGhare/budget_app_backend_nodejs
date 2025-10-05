const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: String,
  amount: Number,
  type: String, // daily or secret
  date: String,
  mode: String  // expense or income
});

module.exports = mongoose.model("Expense", ExpenseSchema);
