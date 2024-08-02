const db = require('../config/db');

exports.getAllFeedback = (callback) => {
  const sql = 'SELECT * FROM feedback';
  db.query(sql, callback);
};

exports.createFeedback = (newItem, callback) => {
  const sql = 'INSERT INTO feedback SET ?';
  db.query(sql, newItem, callback);
};

exports.deleteFeedback = (id, callback) => {
  const sql = 'DELETE FROM feedback WHERE feedbackID = ?';
  db.query(sql, id, callback);
};
