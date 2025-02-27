const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // MongoDB Connection
const sheetRoutes = require("./routes/sheetRoutes"); // API Routes

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); // Connect to MongoDB

// Routes
app.use("/api/sheets", sheetRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

