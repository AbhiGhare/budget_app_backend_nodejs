const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Configure CORS
const corsOptions = {
  origin: [
    "http://localhost:4200",           // local frontend
    "https://your-frontend.vercel.app" // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));


// ✅ CORS middleware (works for serverless / Vercel)
app.use((req, res, next) => {
  // Allow all origins (for testing)
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") return res.sendStatus(200);

  next();
});

// app.use(cors());
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

// ✅ Add this "live" route here
app.get("/", (req, res) => {
  res.send({
    message: "🚀 Backend is live and running successfully!",
    timestamp: new Date(),
    status: "OK"
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
