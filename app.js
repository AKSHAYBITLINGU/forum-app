const path = require("path");
const envFilePath = path.resolve(__dirname, ".env");
require("dotenv").config({
  path: envFilePath,
});
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const User = require("./models/UserModel");

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.db_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes

app.use("/auth", require("./routes/authHandling"));
app.use("/post", require("./routes/postHandling"));
app.use("/", require("./routes/indexHandling"));

const server = app.listen(port, () => {
  console.log("Server listening");
  mongoose.connect(process.env.db_connection).then(() => {
    console.log("Database Connected");
  });
});
