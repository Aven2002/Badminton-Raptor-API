const db = require('../config/db');

exports.getAllAccount = (callback) => {
  const sql = 'SELECT * FROM user_account';
  db.query(sql, callback);
};

exports.getAccount = (id, callback) => {
  const sql = 'SELECT * FROM user_account WHERE userID = ?';
  db.query(sql, [id], callback);
};

exports.createAccount = (newUser, callback) => {
  // Check if username already exists
  const checkUsernameQuery = 'SELECT * FROM user_account WHERE username = ?';
  db.query(checkUsernameQuery, [newUser.username], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length > 0) {
      // Username already taken
      return callback(new Error('Username has been taken'));
    }
    // Proceed with account creation
    const createQuery = 'INSERT INTO user_account SET ?';
    db.query(createQuery, newUser, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  });
};

exports.updateAccount = (id, updatedItem, callback) => {
  const sql = 'UPDATE user_account SET ? WHERE userID = ?';
  db.query(sql, [updatedItem, id], callback);
};

exports.deleteAccount = (id, callback) => {
  const sql = 'DELETE FROM user_account WHERE userID = ?';
  db.query(sql, id, callback);
};
