// imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");

// initializations
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/activities", require("./routes/activities"));

// port listening
app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});