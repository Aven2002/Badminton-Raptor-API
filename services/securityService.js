const db = require('../config/db'); 
const crypto = require('crypto');

exports.getSecurityQuestions = (callback) => {
  db.query('SELECT id, question FROM security_questions', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.getRandomSecurityQuestion = (userID) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT userID, 
             JSON_UNQUOTE(JSON_EXTRACT(security_answers, CONCAT('$[', FLOOR(RAND() * JSON_LENGTH(security_answers)), '].questionID'))) AS questionID
      FROM user_account
      WHERE userID = ?
      LIMIT 1;
    `;
    db.query(query, [userID], (err, results) => {
      if (err) {
        return reject(err);
      }

      if (results.length > 0) {
        const randomQuestion = results[0];
        resolve(randomQuestion);
      } else {
        resolve(null); // No user found or no security questions
      }
    });
  });
};

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

exports.verifySecurityAnswer = (userID, questionID, hashedAnswer) => {
  return new Promise((resolve, reject) => {
    // Query to get the security answers JSON for the user
    const query = 'SELECT security_answers FROM user_account WHERE userID = ?';
    
    db.query(query, [userID], (err, results) => {
      if (err) {
        return reject(err);
      }

      if (results.length === 0) {
        // No such user
        return resolve(false);
      }

      // Parse the JSON containing security answers
      const securityAnswers = JSON.parse(results[0].security_answers);

      // Find the answer for the specific questionID
      const answerEntry = securityAnswers.find(ans => ans.questionID === questionID);

      // Check if the hashed answer matches
      if (answerEntry && answerEntry.hashed_answer === hashedAnswer) {
        resolve(true);
      } else {
        resolve(false);
      }
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
