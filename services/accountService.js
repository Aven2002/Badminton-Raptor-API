const crypto = require('crypto');
const db = require('../config/db');

exports.getAllAccount = (callback) => {
  const sql = 'SELECT * FROM user_account';
  db.query(sql, callback);
};

exports.getAccount = (id, callback) => {
  const sql = 'SELECT * FROM user_account WHERE userID = ?';
  db.query(sql, [id], callback);
};

exports.createAccount = (newUser, callback) => {
  // Check if username already exists
  const checkUsernameQuery = 'SELECT * FROM user_account WHERE username = ?';
  db.query(checkUsernameQuery, [newUser.username], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length > 0) {
      // Username already taken
      return callback(new Error('Username has been taken'));
    }
    // Proceed with account creation
    const createQuery = 'INSERT INTO user_account SET ?';
    db.query(createQuery, newUser, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  });
};


exports.updateAccount = (id, updatedItem, callback) => {
  delete updatedItem.created_at; 

  const sql = 'UPDATE user_account SET ? WHERE userID = ?';
  db.query(sql, [updatedItem, id], callback);
};


exports.deleteAccount = (id, callback) => {
  const sql = 'DELETE FROM user_account WHERE userID = ?';
  db.query(sql, id, callback);
};


/// Function to get user role by userID
exports.getUserRoleById = (userID, callback) => {
  const sql = 'SELECT userRole FROM user_account WHERE userID = ?';

  // Perform the query
  db.query(sql, [userID], (err, results) => {
    if (err) {
      return callback(err); // Pass any error to the callback
    }

    if (Array.isArray(results) && results.length > 0) {
      // Return the userRole directly
      callback(null, results[0].userRole);
    } else {
      // Handle case where no rows are found
      callback(null, null);
    }
  });
};

// Find user by username
exports.findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT userID FROM user_account WHERE username = ?', [username], (err, results) => {
      if (err) return reject(err);
      if (results.length > 0) {
        resolve(results[0]); // Return the user with userID
      } else {
        resolve(null); // No user found
      }
    });
  });
};


// Helper function to hash the password
const hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

// Function to verify the password
exports.verifyPassword = async (identifier, password) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT userID, password FROM user_account WHERE username = ? OR email = ?';

    db.query(query, [identifier, identifier], (err, results) => {
      if (err) {
        return reject(err);
      }

      if (results.length === 0) {
        return resolve({ success: false, message: 'User not found.' });
      }

      const user = results[0];

      // Hash the provided password
      const hashedPassword = hashPassword(password);

      // Compare the provided hashed password with the stored hashed password
      if (hashedPassword === user.password) {
        resolve({ success: true, userID: user.userID });
      } else {
        resolve({ success: false, message: 'Incorrect password.' });
      }
    });
  });
};

