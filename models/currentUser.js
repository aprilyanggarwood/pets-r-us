const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const currentUserSchema = new mongoose.Schema({
  currentUserName: { type: String, required: true, unique: true },
  password: { type: String },
});

currentUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("currentUser", currentUserSchema);
