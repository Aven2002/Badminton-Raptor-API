const db = require('../config/db');

exports.getAllFavorite = (callback) => {
  const sql = `
    SELECT f.favoriteID, f.userID, f.equipID, e.equipName, e.equipPrice, e.equipCategory, e.equipBrand, e.equipImgPath
    FROM favorite f
    JOIN equipment e ON f.equipID = e.equipID
  `;
  db.query(sql, callback);
};


exports.createFavorite = (newItem, callback) => {
  const sql = 'INSERT INTO favorite SET ?';
  db.query(sql, newItem, callback);
};

exports.updateFavorite = (id, updatedItem, callback) => {
  const sql = 'UPDATE favorite SET ? WHERE favoriteID = ?';
  db.query(sql, [updatedItem, id], callback);
};

exports.deleteFavorite = (id, callback) => {
  const sql = 'DELETE FROM favorite WHERE favoriteID = ?';
  db.query(sql, id, callback);
};
