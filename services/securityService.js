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
    db.query(createQuery, newUserSecurityAnswer, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  };

// Verify security answers
exports.verifySecurityAnswers = (userID, answers, callback) => {
  const answerPromises = answers.map((answer) => {
    const hashedAnswer = crypto.createHash('sha256').update(answer.answer).digest('hex');
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id FROM user_security_answers WHERE userID = ? AND questionID = ? AND hashed_answer = ?',
        [userID, answer.questionID, hashedAnswer],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0);
        }
      );
    });
  });

  Promise.all(answerPromises)
    .then(results => callback(null, results.every(result => result)))
    .catch(err => callback(err));
};
