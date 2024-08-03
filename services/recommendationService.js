const db = require('../config/db');

exports.getAllRecommendation = (callback) => {
  const sql = 'SELECT * FROM recommendation';
  db.query(sql, callback);
};

exports.getRecommendationById = (id, callback) => {
    const sql = 'SELECT * FROM recommendation WHERE recommendationID = ? ';
    db.query(sql, id, callback);
  };

exports.createRecommendation = (newItem, callback) => {
  const sql = 'INSERT INTO recommendation SET ?';
  db.query(sql, newItem, callback);
};

exports.deleteFeedback = (id, callback) => {
  const sql = 'DELETE FROM recommendation WHERE recommendationID = ?';
  db.query(sql, id, callback);
};
