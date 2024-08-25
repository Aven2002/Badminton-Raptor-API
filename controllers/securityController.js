const crypto = require('crypto');
const securityService = require('../services/securityService'); 

// Get security questions
exports.getSecurityQuestions = (req, res) => {
  securityService.getSecurityQuestions((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving security questions' });
    }
    res.json(result);
  });
};


// Verify security answer
exports.verifySecurityAnswer = async (req, res) => {
  const { userID, questionID, answer } = req.body;

  // Validate required fields
  if (!userID || !questionID || !answer) {
    return res.status(400).json({ message: 'UserID, questionID, and answer are required' });
  }

  try {
    // Hash the provided answer
    const hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');

    // Call the service to verify the hashed answer
    const isValid = await securityService.verifySecurityAnswer(userID, questionID, hashedAnswer);

    if (isValid) {
      res.status(200).json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  } catch (err) {
    console.error('Error verifying security answer:', err);
    res.status(500).json({ message: 'Failed to verify security answer' });
  }
};


// Add security answer
exports.addSecurityAnswer = async (req, res) => {
  const { userID, questionID, answer } = req.body;

  // Validate required fields
  if (!userID || !questionID || !answer) {
    return res.status(400).json({ message: 'UserID, questionID, and answer are required' });
  }

  try {
    // Hash the answer
    const hashedAnswer = crypto.createHash('sha256').update(answer).digest('hex');
    
    // Prepare the new user security answer object
    const newUserSecurityAnswer = {
      userID,
      questionID,
      hashed_answer: hashedAnswer
    };

    // Insert the new security answer into the database
    await new Promise((resolve, reject) => {
      securityService.createUserSecurityAnswer(newUserSecurityAnswer, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Respond with success
    res.status(201).json({ message: 'Security answer created successfully' });
  } catch (err) {
    console.error('Error creating security answer:', err);
    res.status(500).json({ message: 'Failed to create security answer' });
  }
};
