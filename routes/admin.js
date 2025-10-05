// routes/admin.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const userModel = require("../models/user.model");
const salaryModel = require("../models/salary.model");
const expenseModel = require("../models/expense.model");


// ✅ Get all users with salaries + expenses
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    const salaries = await salaryModel.find();
    const expenses = await expenseModel.find();

    res.json({ users, salaries, expenses });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Change user role (user → admin)
router.put("/users/:id/role", auth, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.json({ msg: "Role updated", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Delete user (and cascade remove salaries & expenses if you want)
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
  try {
    await salaryModel.deleteMany({ userId: req.params.id });
    await expenseModel.deleteMany({ userId: req.params.id });
    await userModel.findByIdAndDelete(req.params.id);

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Reset user password
router.put("/users/:id/reset-password", auth, isAdmin, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(req.params.id, { password: hashed });

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
