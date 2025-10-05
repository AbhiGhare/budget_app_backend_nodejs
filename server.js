const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/salary", require("./routes/salary.routes"));
app.use("/api/expenses", require("./routes/expense.routes"));
app.use("/api/reports", require("./routes/report")); // ✅ NEW
app.use("/api/admin", require("./routes/admin"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
