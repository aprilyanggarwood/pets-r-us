const express = require("express");
const api = express.Router();

api.get("/appointments", function (req, res) {
  res.send("./api/profile");
});

module.exports = api;
