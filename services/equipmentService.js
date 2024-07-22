const db = require('../config/db');

exports.getAllEquipment = (callback) => {
  const sql = 'SELECT * FROM equipment';
  db.query(sql, callback);
};

exports.createEquipment = (newItem, callback) => {
  const sql = 'INSERT INTO equipment SET ?';
  db.query(sql, newItem, callback);
};

exports.updateEquipment = (id, updatedItem, callback) => {
  const sql = 'UPDATE equipment SET ? WHERE equipID = ?';
  db.query(sql, [updatedItem, id], callback);
};

exports.deleteEquipment = (id, callback) => {
  const sql = 'DELETE FROM equipment WHERE equipID = ?';
  db.query(sql, id, callback);
};
