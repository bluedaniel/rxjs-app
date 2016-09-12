const users = require('./users.json');

exports.findById = function (id, cb) {
  process.nextTick(() => {
    var idx = id - 1;
    if (users[idx]) {
      cb(null, users[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
};

exports.findByUsername = function (username, cb) {
  process.nextTick(() => {
    for (var i = 0, len = users.length; i < len; i++) {
      var record = users[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
