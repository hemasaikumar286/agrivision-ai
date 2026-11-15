const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

app.get("/", (req, res) => {
  res.json({
    message: "AgriVision AI backend is running"
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS connected");

    res.json({
      success: true,
      message: "MySQL connected successfully",
      data: rows
    });

  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`AgriVision backend running on http://localhost:${PORT}`);
});
