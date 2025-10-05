const express = require("express");
const Salary = require("../models/salary.model");
const router = express.Router();

// Get salary by user
router.get("/:userId", async (req, res) => {
  const salary = await Salary.findOne({ userId: req.params.userId });
  res.json(salary);
});

// Update or create salary
router.post("/", async (req, res) => {
  const { userId, month, amount, daily, secret } = req.body;
  let salary = await Salary.findOne({ userId, month });
  if (salary) {
    salary.amount = amount;
    salary.daily = daily;
    salary.secret = secret;
  } else {
    salary = new Salary({ userId, month, amount, daily, secret });
  }
  await salary.save();
  res.json(salary);
});

module.exports = router;
