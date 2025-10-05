const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allow all CORS requests
const allowedOrigins = [
  "http://localhost:4200", // Angular dev
  "https://budget-app-frontend-puce.vercel.app", // Vercel / live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

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
    status: "OK",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
