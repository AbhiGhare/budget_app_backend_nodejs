const mongoose = require("mongoose");

const MonthlyReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: Number,  // 1-12
  year: Number,
  salary: Number,
  daily: Number,
  secret: Number,
  expenses: Array, // store snapshot of all expenses
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MonthlyReport", MonthlyReportSchema);
