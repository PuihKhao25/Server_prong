var db = require("../config/connectDB");

var Auth = {
  find: function (result) {
    db.query("SELECT * FROM users", function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  findById: function (email, result) {
    db.query("SELECT * From users WHERE email=?", [email], function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  
  create: function (auth, result) {
    db.query("INSERT INTO users SET ?", auth, function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result({ id: data.insertId, ...auth });
      }

      
    });
  },
};
module.exports = Auth;
