const UserModel = require("./user.js");

module.exports = {
  loginUser: function (username, password, callback) {
    UserModel.findOne({ username: username }).exec(function (error, user) {
      if (error) {
        callback({ error: true });
      } else if (!user) {
        callback({ error: true });
      } else {
        user.comparePassword(password, function (matchError, isMatch) {
          if (matchError) {
            callback({ error: true });
          } else if (!isMatch) {
            callback({ error: true });
          } else {
            callback({ success: true });
          }
        });
      }
    });
  },
};
