const db = require('../config/db');

exports.getAllFeedback = (callback) => {
  const sql = 'SELECT * FROM feedback';
  db.query(sql, callback);
};

exports.getFeedback = (id, callback) => {
  const sql = 'SELECT * FROM feedback WHERE feedbackID = ?';
  db.query(sql, id, callback);
};

exports.createFeedback = (newItem, callback) => {
  const sql = 'INSERT INTO feedback SET ?';
  db.query(sql, newItem, callback);
};

exports.changeFeedbackStatus = (id, callback) => {
  const sql = 'UPDATE feedback SET status = 1 WHERE feedbackID = ?';
  db.query(sql, [id], callback);
};

exports.deleteFeedback = (id, callback) => {
  const sql = 'DELETE FROM feedback WHERE feedbackID = ?';
  db.query(sql, id, callback);
};
