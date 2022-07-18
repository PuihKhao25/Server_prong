const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./config/connectDB");
const verifyToken = require("./middlewares/verifyToken");

const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use("/api/auth", require("./routes/authen"));
app.use("/api/", verifyToken, require("./routes/api"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  db.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log("connect data successfully");
    }
  });
});
