const express = require("express");
const { saveUser } = require("./data.js");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// black box for me...
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("information");
});

app.post("/api/signIN", (req, res) => {
  const { name, password } = req.body;
  console.log("Received:", name, password);

  saveUser(name, password)
    .then((result) => {
      res.json({
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
