const db = require('../config/db');

exports.getAllAccount = (callback) => {
  const sql = 'SELECT * FROM user_account';
  db.query(sql, callback);
};

exports.createAccount = (newItem, callback) => {
  const sql = 'INSERT INTO user_account SET ?';
  db.query(sql, newItem, callback);
};

exports.updateAccount = (id, updatedItem, callback) => {
  const sql = 'UPDATE user_account SET ? WHERE userID = ?';
  db.query(sql, [updatedItem, id], callback);
};

exports.deleteAccount = (id, callback) => {
  const sql = 'DELETE FROM user_account WHERE userID = ?';
  db.query(sql, id, callback);
};

