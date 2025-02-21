const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware

app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Failed:", err));

// Routes
app.use("/api/auth", authRoutes); 

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Outcome-Based Education Backend API!");
});

// Export App for Server Usage
module.exports = app;
