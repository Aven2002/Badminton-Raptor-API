const crypto = require('crypto');
const securityService = require('../services/securityService'); // Import securityService using CommonJS

// Get security questions
exports.getSecurityQuestions = (req, res) => {
  securityService.getSecurityQuestions((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving security questions' });
    }
    res.json(result);
  });
};

// Verify security answers
exports.verifySecurityAnswers = (req, res) => {
  const { userID, answers } = req.body;

  securityService.verifySecurityAnswers(userID, answers, (err, verified) => {
    if (err) {
      return res.status(500).json({ message: 'Error verifying security answers' });
    }
    if (verified) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  });
};

// Add security answers
exports.addSecurityAnswer = async (req, res) => {
    const { userID, answers } = req.body;
  
    if (!userID || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'UserID and answers are required' });
    }
  
    try {
      for (const answer of answers) {
        const { questionID, answer: userAnswer } = answer;
        const hashedAnswer = crypto.createHash('sha256').update(userAnswer).digest('hex');
        const newUserSecurityAnswer = {
          userID,
          questionID,
          hashed_answer: hashedAnswer
        };
        await new Promise((resolve, reject) => {
          securityService.createUserSecurityAnswer(newUserSecurityAnswer, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      }
      res.status(201).json({ message: 'Security answers created successfully' });
    } catch (err) {
      console.error('Error creating security answers:', err);
      res.status(500).json({ message: 'Failed to create security answers' });
    }
  };
