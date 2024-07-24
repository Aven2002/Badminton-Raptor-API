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

exports.getEquipmentDetails = (id, callback) => {
  const equipmentQuery = 'SELECT * FROM equipment WHERE equipID = ?';

  db.query(equipmentQuery, [id], (err, equipmentRows) => {
    if (err) return callback(err);
    if (equipmentRows.length === 0) return callback(new Error('Equipment not found'));

    const equipment = equipmentRows[0];
    let detailsQuery = '';

    switch (equipment.equipCategory) {
      case 'Racquet':
        detailsQuery = 'SELECT * FROM racquet WHERE equipID = ?';
        break;
      case 'Shuttlecock':
        detailsQuery = 'SELECT * FROM shuttlecock WHERE equipID = ?';
        break;
      case 'Bags':
        detailsQuery = 'SELECT * FROM bags WHERE equipID = ?';
        break;
      case 'Footwear':
        detailsQuery = 'SELECT * FROM footwear WHERE equipID = ?';
        break;
      case 'Apparel':
        detailsQuery = 'SELECT * FROM apparel WHERE equipID = ?';
        break;
      case 'Accessories':
        detailsQuery = 'SELECT * FROM accessories WHERE equipID = ?';
        break;
      default:
        return callback(new Error('Unknown equipment category'));
    }

    db.query(detailsQuery, [id], (err, detailsRows) => {
      if (err) return callback(err);
      const details = detailsRows.length > 0 ? detailsRows[0] : {};
      callback(null, { equipment, details });
    });
  });
};
