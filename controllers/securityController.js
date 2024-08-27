const crypto = require('crypto');
const securityService = require('../services/securityService'); 


exports.getSecurityQuestions = (req, res) => {
  securityService.getSecurityQuestions((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving security questions' });
    }
    res.json(result);
  });
};

exports.getRandomSecurityQuestion = async (req, res) => {
  const { userID } = req.params;

  if (!userID) {
    return res.status(400).json({ message: 'UserID is required' });
  }

  try {
    const randomQuestion = await securityService.getRandomSecurityQuestion(userID);
    if (randomQuestion) {
      res.status(200).json(randomQuestion);
    } else {
      res.status(404).json({ message: 'No security questions found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching random security question:', error);
    res.status(500).json({ message: 'Error fetching security question' });
  }
};

exports.getSecurityQuestionByID = async (req, res) => {
  const { questionID } = req.params;

  if (!questionID) {
    return res.status(400).json({ message: 'QuestionID is required' });
  }

  try {
    const question = await securityService.getSecurityQuestionByID(questionID);
    if (question) {
      res.status(200).json({ question });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error('Error fetching security question:', error);
    res.status(500).json({ message: 'Error fetching security question' });
  }
};


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

exports.updatePassword = async (req, res) => {
  const { userID, newPassword } = req.body;

  // Validate required fields
  if (typeof userID !== 'number' || typeof newPassword !== 'string') {
    return res.status(400).json({ message: 'UserID must be a number and newPassword must be a string' });
  }

  try {
    // Hash the new password
    const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

    // Call the service to update the password
    const result = await securityService.updateUserPassword(userID, hashedPassword);

    if (result) {
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update password' });
    }
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Failed to update password' });
  }
};