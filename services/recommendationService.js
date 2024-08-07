const db = require('../config/db');

exports.getAllRecommendation = (callback) => {
  const sql = `
    SELECT 
      r.recommendationID, 
      r.userID, 
      r.rating, 
      r.created_at,
      GROUP_CONCAT(re_equip.equipID ORDER BY re_equip.recommendationEquipID ASC SEPARATOR ', ') AS equipment
    FROM 
      recommendation r
    LEFT JOIN 
      recommendation_equipment re_equip ON r.recommendationID = re_equip.recommendationID
    GROUP BY 
      r.recommendationID, r.userID, r.rating, r.created_at
    LIMIT 3;
  `;
  db.query(sql, callback);
};


exports.getRecommendationById = (id, callback) => {
  const sql = `
    SELECT 
      r.recommendationID, 
      r.userID, 
      r.rating, 
      r.created_at,
      GROUP_CONCAT(re_equip.equipID ORDER BY re_equip.recommendationEquipID ASC SEPARATOR ', ') AS equipment
    FROM 
      recommendation r
    LEFT JOIN 
      recommendation_equipment re_equip ON r.recommendationID = re_equip.recommendationID
    WHERE 
      r.recommendationID = ?
    GROUP BY 
      r.recommendationID, r.userID, r.rating, r.created_at
  `;
  db.query(sql, [id], callback);
};

exports.createRecommendation = (newItem, equipmentIds, callback) => {
  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      return callback(err);
    }

    // Insert into the recommendation table
    const recommendationSql = 'INSERT INTO recommendation SET ?';
    db.query(recommendationSql, newItem, (err, result) => {
      if (err) {
        return db.rollback(() => {
          callback(err);
        });
      }

      const recommendationID = result.insertId;
      // Prepare data for the recommendation_equipment table
      const equipmentData = equipmentIds.map(equipID => [recommendationID, equipID]);

      // Insert into the recommendation_equipment table
      const equipmentSql = 'INSERT INTO recommendation_equipment (recommendationID, equipID) VALUES ?';
      db.query(equipmentSql, [equipmentData], (err, results) => {
        if (err) {
          return db.rollback(() => {
            callback(err);
          });
        }

        // Commit the transaction
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


exports.deleteRecommendationById = (id, callback) => {
  const sql = 'DELETE FROM recommendation WHERE recommendationID = ?';
  db.query(sql, [id], callback);
};

