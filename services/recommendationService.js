const db = require('../config/db');

exports.getAllRecommendation = (callback) => {
  const sql = `SELECT * FROM recommendations`;
  db.query(sql, callback);
};

exports.getRecommendationById = (id, callback) => {
  const sql = `
    SELECT * FROM recommendations WHERE recommendationID = ?`;
  db.query(sql, [id], callback);
};

exports.deleteRecommendationById = (id, callback) => {
  const sql = 'DELETE FROM recommendations WHERE recommendationID = ?';
  db.query(sql, [id], callback);
};

