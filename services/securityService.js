const db = require('../config/db'); // Ensure this path is correct
const crypto = require('crypto');

// Retrieve all security questions
exports.getSecurityQuestions = (callback) => {
  db.query('SELECT id, question FROM security_questions', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Create new security answer record
exports.createUserSecurityAnswer = (newUserSecurityAnswer, callback) => {
  const createQuery = 'INSERT INTO user_security_answers SET ?';
  
  // Execute the database query to insert the new security answer
  db.query(createQuery, newUserSecurityAnswer, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

// Verify security answer
exports.verifySecurityAnswer = async (userID, questionID, hashedAnswer) => {
  return new Promise((resolve, reject) => {
    const verifyQuery = 'SELECT id FROM user_security_answers WHERE userID = ? AND questionID = ? AND hashed_answer = ?';

    // Execute the query to check if the hashed answer matches the one stored in the database
    db.query(verifyQuery, [userID, questionID, hashedAnswer], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.length > 0); // Return true if a match is found
    });
  });
};