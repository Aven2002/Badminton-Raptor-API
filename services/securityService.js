const db = require('../config/db'); // Ensure this path is correct
const crypto = require('crypto');

// Retrieve all security questions
exports.getSecurityQuestions = (callback) => {
  db.query('SELECT id, question FROM security_questions', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Get a random security question for a user
exports.getRandomSecurityQuestion = (userID) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT userID, questionID
      FROM user_security_answers
      WHERE userID = ?
      ORDER BY RAND()
      LIMIT 1;
    `;

    db.query(query, [userID], (err, results) => {
      if (err) {
        return reject(err);
      }

      if (results.length > 0) {
        // Only return userID and questionID
        const { userID, questionID } = results[0];
        resolve({ userID, questionID });
      } else {
        resolve(null); // No questions found for this user
      }
    });
  });
};

// Get a security question by questionID
exports.getSecurityQuestionByID = (questionID) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT question FROM security_questions WHERE id = ?';
    
    db.query(query, [questionID], (err, results) => {
      if (err) {
        return reject(err);
      }

      if (results.length > 0) {
        resolve(results[0].question);
      } else {
        resolve(null); // No question found for this ID
      }
    });
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

exports.verifySecurityAnswer = async (userID, questionID, hashedAnswer) => {
  return new Promise((resolve, reject) => {
    const verifyQuery = 'SELECT id FROM user_security_answers WHERE userID = ? AND questionID = ? AND hashed_answer = ?';

    db.query(verifyQuery, [userID, questionID, hashedAnswer], (err, results) => {
      if (err) {
        return reject(err);
      }
      console.log('Query results:', results);
      resolve(results.length > 0); // Return true if a match is found
    });
  });
};

exports.updateUserPassword = async (userID, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE user_account SET password = ? WHERE userID = ?';

    db.query(updateQuery, [hashedPassword, userID], (err, results) => {
      if (err) {
        return reject(err);
      }
      // Check if the update was successful
      resolve(results.affectedRows > 0);
    });
  });
};