const UserModel = require("./user.js");

module.exports = {
  createANewUser: function (username, password, callback) {
    const newUserDbDocument = new UserModel({
      username: username,
      password: password,
    });

    newUserDbDocument.save(function (error) {
      if (error) {
        callback({ error: true });
      } else {
        callback({ success: true });
      }
    });
  },
};
