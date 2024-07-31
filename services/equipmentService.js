const db = require('../config/db');

exports.getAllEquipment = (callback) => {
  const sql = 'SELECT * FROM equipment';
  db.query(sql, callback);
};

exports.getEquipmentByCategory = (category, callback) => {
  const sql = 'SELECT * FROM equipment WHERE equipCategory = ?';
  db.query(sql, [category], callback);
};

exports.createEquipment = (equipmentData, detailData, detailTable, callback) => {
  const sqlInsertEquipment = `
    INSERT INTO equipment (equipName, equipCategory, equipBrand, equipImgPath, equipPrice)
    VALUES (?, ?, ?, ?, ?)`;

  const equipmentValues = [
    equipmentData.equipName,
    equipmentData.equipCategory,
    equipmentData.equipBrand,
    equipmentData.equipImgPath,
    equipmentData.equipPrice
  ];

  db.beginTransaction((err) => {
    if (err) return callback(err);

    db.query(sqlInsertEquipment, equipmentValues, (err, result) => {
      if (err) {
        return db.rollback(() => {
          callback(err);
        });
      }

      const equipID = result.insertId;
      const sqlInsertDetail = `
        INSERT INTO ${detailTable} (equipID, ${Object.keys(detailData).join(', ')})
        VALUES (?, ${Object.values(detailData).map(() => '?').join(', ')})`;

      const detailValues = [equipID, ...Object.values(detailData)];

      db.query(sqlInsertDetail, detailValues, (err, result) => {
        if (err) {
          return db.rollback(() => {
            callback(err);
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              callback(err);
            });
          }
          callback(null, result);
        });
      });
    });
  });
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
