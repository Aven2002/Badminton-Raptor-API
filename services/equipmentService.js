const db = require('../config/db');

exports.getAllEquipment = (callback) => {
  const sql = 'SELECT * FROM equipment';
  db.query(sql, callback);
};

exports.createEquipment = (equipment, details, detailTable, callback) => {
  const { equipName, equipCategory, equipBrand, equipImgPath, equipPrice } = equipment;

  // Validate required fields
  if (!equipName || !equipCategory || !equipBrand || !equipPrice) {
    return callback(new Error('Missing required equipment fields'));
  }

  // SQL query to insert into `equipment` table
  const sql = 'INSERT INTO equipment (equipName, equipCategory, equipBrand, equipImgPath, equipPrice) VALUES (?, ?, ?, ?, ?)';
  const values = [equipName, equipCategory, equipBrand, equipImgPath || null, equipPrice];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting equipment:', err); // Log error
      return callback(err);
    }

    const equipID = result.insertId;

    // Ensure `details` is an object and `detailTable` is a valid table name
    if (typeof details !== 'object' || !detailTable) {
      return callback(new Error('Invalid details or detail table'));
    }

    const detailValues = { equipID, ...details };

    // SQL query to insert into detail table
    const detailSql = `INSERT INTO ${detailTable} SET ?`;

    db.query(detailSql, detailValues, (err, result) => {
      if (err) {
        console.error('Error inserting equipment details:', err); // Log error
        return callback(err);
      }

      callback(null, result);
    });
  });
};

exports.getEquipmentById = (id, callback) => {
  const sql = 'SELECT * FROM equipment WHERE equipID = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};

exports.updateEquipment = (id, updatedItem, callback) => {
  const { equipName, equipCategory, equipBrand, equipPrice } = updatedItem;

  // Construct the equipImgPath
  const fileExtension = '.png'; // Assuming all images are PNG. Adjust if necessary.
  const equipImgPath = `${equipCategory}/${equipName}${fileExtension}`;

  const sql = `
    UPDATE equipment
    SET equipName = ?, equipCategory = ?, equipBrand = ?, equipImgPath = ?, equipPrice = ?
    WHERE equipID = ?;
  `;

  const values = [equipName, equipCategory, equipBrand, equipImgPath, equipPrice, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

exports.updateEquipmentDetails = (id, category, details, callback) => {
  let updateDetailsQuery;
  let updateDetailsParams;

  switch (category.toLowerCase()) {
    case 'racquet':
      updateDetailsQuery = `
        UPDATE racquet
        SET flex = ?, frame = ?, shaft = ?, joint = ?, length = ?, weight = ?, stringAdvice = ?, color = ?, madeIn = ?
        WHERE equipID = ?
      `;
      updateDetailsParams = [
        details.flex,
        details.frame,
        details.shaft,
        details.joint,
        details.length,
        details.weight,
        details.stringAdvice,
        details.color,
        details.madeIn,
        id
      ];
      break;
    case 'shuttlecock':
      updateDetailsQuery = `
        UPDATE shuttlecock
        SET quantityPerTube = ?, description = ?
        WHERE equipID = ?
      `;
      updateDetailsParams = [details.quantityPerTube, details.description, id];
      break;
    case 'bags':
      updateDetailsQuery = `
        UPDATE bags
        SET color = ?, size = ?, description = ?
        WHERE equipID = ?
      `;
      updateDetailsParams = [details.color, details.size, details.description, id];
      break;
    case 'footwear':
      updateDetailsQuery = `
        UPDATE footwear
        SET color = ?, upper = ?, midsole = ?, outsole = ?, description = ?
        WHERE equipID = ?
      `;
      updateDetailsParams = [details.color, details.upper, details.midsole, details.outsole, details.description, id];
      break;
    case 'apparel':
      updateDetailsQuery = `
        UPDATE apparel
        SET color = ?, material = ?
        WHERE equipID = ?
      `;
      updateDetailsParams = [details.color, details.material, id];
      break;
    case 'accessories':
      updateDetailsQuery = `
        UPDATE accessories
        SET description = ?
        WHERE equipID = ?
      `;
      updateDetailsParams = [details.description, id];
      break;
    default:
      return callback(new Error('Invalid equipment category'));
  }

  db.query(updateDetailsQuery, updateDetailsParams, callback);
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
