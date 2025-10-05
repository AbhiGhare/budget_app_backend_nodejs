const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // ✅ new field
  debugPlain: { type: String, select: true }
});

module.exports = mongoose.model("User", UserSchema);
