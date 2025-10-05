const express = require("express");
const Expense = require("../models/expense.model");
const router = express.Router();

// Get expenses by user
router.get("/:userId", async (req, res) => {
  const expenses = await Expense.find({ userId: req.params.userId });
  res.json(expenses);
});

// Add expense
router.post("/", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// Update expense
router.put("/:id", async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(expense);
});

// Delete expense
router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
