const express = require("express");
const router = express.Router();
// const Salary = require("../models/Salary");
// const Expense = require("../models/Expense");
const MonthlyReport = require("../models/MonthlyReport");
// const authMiddleware = require("../middleware/authMiddleware");
const Salary = require("../models/salary.model");
const authMiddleware = require("../middleware/authMiddleware");
const Expense = require("../models/expense.model");

// Archive last month’s data
router.post("/archive", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // get all user data
    const salary = await Salary.findOne({ userId });
    const expenses = await Expense.find({ userId });

    if (!salary) return res.status(400).json({ msg: "No salary record found" });

    // current month/year
    const now = new Date();
    const month = now.getMonth(); // last month archive
    const year = now.getFullYear();

    // check if already archived
    const exists = await MonthlyReport.findOne({ userId, month, year });
    if (exists) {
      return res.status(400).json({ msg: "This month already archived" });
    }

    // create archive
    const report = new MonthlyReport({
      userId,
      month,
      year,
      salary: salary.amount,
      daily: salary.daily,
      secret: salary.secret,
      expenses: expenses
    });

    await report.save();

    // reset current data
    await Salary.updateOne({ userId }, { $set: { amount: 0, daily: 0, secret: 0 } });
    await Expense.deleteMany({ userId });

    res.json({ msg: "Monthly report archived successfully", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all reports for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reports = await MonthlyReport.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
