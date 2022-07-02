// Import
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const User = require("./models/user.js");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const { authenticate } = require("passport");

const conn =
  "mongodb+srv://apriladmin:apriladmin@buwebdev-cluster-1.yfwec.mongodb.net/test";

mongoose
  .connect(conn)
  .then(() => {
    console.log("Connection to the database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));

app.use("/styles", express.static(__dirname + "public/styles"));

// app.use('/js', express.static(__dirname + 'public/js'))
app.use("/images", express.static(__dirname + "public/images"));

// set the view engine to ejs
app.set("view engine", "ejs");

// index page

app.get("/", function (req, res) {
  res.render("index");
});

// grooming page
app.get("/grooming", function (req, res) {
  res.render("grooming");
});

// training page
app.get("/training", function (req, res) {
  res.render("training");
});

// Boarding page
app.get("/boarding", function (req, res) {
  res.render("boarding");
});

// Sign up page
app.get("/sign-up", function (req, res) {
  res.render("sign-up");
});

// Sign up page
app.get("/log-in", function (req, res) {
  res.render("log-in");
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User, authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

User.register(
  new User({ username: username, email: email }),
  password,
  function (err, user) {
    if (err) {
      console.log(err);
      return res.redirect("./sign-up");
    }

    passport.Authenticator("local")(req, res, function () {
      res.redirect("./sign-up");
    });
  }
);

// Listen on port 3001
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

app.listen(PORT, () => {
  User.find({}, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("\n  --DISPLAYING USER LIST--");
      for (let user of users) {
        console.log(`  User username: ${user.username}`);
      }

      User.findOne({ username: "Rose" }, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log("\n  --SELECTED USER--");
          console.log(`  User name: ${user.username}`);

          console.log("\n  Press Ctrl+C to stop the server...");
        }
      });
    }
  });
  console.log("Application started and listening on PORT: " + PORT);
});
