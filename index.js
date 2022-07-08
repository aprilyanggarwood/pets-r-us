/*
  Title: Project Assignment - Pets-R-Us
  Author: April Yang
  Date: 06/18/2022
  Description: Node.js, express, and mongoDB application
*/

// Import
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const moment = require("moment");
const helmet = require("helmet");

// mongoose model imports
const User = require("./models/user.js");

// set the view engine to html
app.engine(".html", require("ejs").__express);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// set the view engine to ejs
// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));
app.use("/styles", express.static(__dirname + "public/styles"));
// app.use('/js', express.static(__dirname + 'public/js'))
app.use("/images", express.static(__dirname + "public/images"));
app.use(cookieParser());
app.use(express.json());
app.use(helmet.xssFilter());
const csurf = require("csurf");

const csurfProtection = csurf({ cookie: true });

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const PORT = process.env.PORT || 3000;
const CONN =
  "mongodb+srv://apriladmin:apriladmin@buwebdev-cluster-1.yfwec.mongodb.net/web340DB";
// const message = " Welcome to the Pets-R-Us website"

// connect to mongoDB atlas
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

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
// app.get("/register", function (req, res) {
//   res.render("register");
// });

// app.use((req, res, next) => {
//   const token = req.csrfToken();
//   res.cookie("XSRF-TOKEN", token);
//   res.locals.csrfToken = token;
//   next();
// });

// log in page
app.get("/login", function (req, res) {
  res.render("login");
});

// find user function
app.get("/register", (req, res) => {
  User.find({}, function (err, users) {
    console.log(users);
    if (err) {
      console.log(err);
    } else {
      res.render("register", {
        moment: moment,
        users: users,
      });
    }
  });
});

// handling user signup with username, email, and password
app.post("/register", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  User.register(
    new User({
      username: username,
      email: email,
    }),
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("/register");
      }

      // passport.authenticate("local")(req, res, function () {
      //   res.redirect("/register");
      // });
    }
  );
});

// creates a new user
app.post("/register", (req, res) => {
  // console.log(`\n  CSRF protected value: ${req.body.userName}`);
  const userName = req.body.userName;

  console.log(req.body);
  let postUser = new User({
    username: userName,
  });

  User.create(postUser, function (err, postUser) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// verified log in user by passport library
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// app.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// wire up server
app.listen(PORT, function () {
  console.log("Server Has Started!");
});
