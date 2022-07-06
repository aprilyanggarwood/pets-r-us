const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  createdAt: { type: Date, default: () => Date.now, immutable: true },
  updatedAt: { type: Date, default: () => Date.now, immutable: true },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
