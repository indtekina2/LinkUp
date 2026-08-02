const express = require("express");
const register = require("./controllers/Register");
const connectDB = require("./config/db")
const login = require("./controllers/Login")
const aunthenticateToken = require("./middleware/authMiddleware")

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// connecting with mongoDB
connectDB();

// black box for me...
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("information");
});

app.post("/api/signup", register);

app.post("/api/login", login)

app.get("/api/protected", aunthenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.user.id });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
