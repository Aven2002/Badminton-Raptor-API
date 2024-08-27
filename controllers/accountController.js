const crypto = require('crypto');
const accountService = require('../services/accountService');

exports.getAllAccount = (req, res) => {
  accountService.getAllAccount((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getAccount = (req, res) => {
  const id = req.params.id;

  accountService.getAccount(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

// Function to hash passwords
function hashPassword(password) {
  if (typeof password !== 'string') {
    throw new TypeError('Password must be a string');
  }
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to hash security answers
function hashAnswer(answer) {
  if (typeof answer !== 'string') {
    throw new TypeError('Answer must be a string');
  }
  return crypto.createHash('sha256').update(answer).digest('hex');
}

exports.createAccount = (req, res) => {
  const {
    profileImg, fname, lname, email, username,
    password, gender, age, race, contactNum, dob, securityAnswers
  } = req.body;

  // Validate the password
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password is required and must be a string' });
  }

  // Hash the password
  let hashedPassword;
  try {
    hashedPassword = hashPassword(password);
  } catch (error) {
    return res.status(500).json({ message: 'Error hashing the password' });
  }

  // Handle security answers if provided
  let hashedSecurityAnswers = [];
  if (securityAnswers && Array.isArray(securityAnswers)) {
    hashedSecurityAnswers = securityAnswers.map(answer => ({
      questionID: answer.questionID,
      hashed_answer: hashAnswer(answer.answer)
    }));
  }

  // Create new user object
  const newUser = {
    profileImg,
    fname,
    lname,
    email,
    username,
    password: hashedPassword,
    gender,
    age,
    race,
    contactNum,
    dob,
    security_answers: JSON.stringify(hashedSecurityAnswers) // Store as JSON string
  };

  // Call the service to create the account
  accountService.createAccount(newUser, (err, result) => {
    if (err) {
      console.error('Error creating account:', err);

      if (err.message === 'Username has been taken') {
        return res.status(400).json({ message: 'Username has been taken. Please choose a new username.' });
      }

      return res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }

    res.status(201).json({ id: result.insertId, ...newUser });
  });
};


exports.updateAccount = (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  accountService.updateAccount(id, updatedItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Account updated', updatedItem });
  });
};

exports.deleteAccount = (req, res) => {
  const id = req.params.id;
  accountService.deleteAccount(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Account deleted' });
  });
};

// Method to get user role based on userID
exports.getUserRole = (req, res) => {
  const userId = req.params.id;

  accountService.getUserRoleById(userId, (err, userRole) => {
    if (err) {
      console.error('Error fetching user role:', err); // Log the error for debugging
      return res.status(500).json({ message: 'Server error', error: err.message });
    }

    if (userRole) {
      res.status(200).json({ userRole }); 
    } else {
      res.status(404).json({ message: 'User role not found' });
    }
  });
};

// Get userID by username
exports.getUserIDByUsername = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const user = await accountService.findUserByUsername(username);
    if (user) {
      return res.status(200).json({ userID: user.userID });
    } else {
      return res.status(404).json({ message: 'Username does not exist' });
    }
  } catch (err) {
    console.error('Error finding user by username:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyPassword = async (req, res) => {
  const { identifier, password } = req.body;
  
  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Identifier and password are required.' });
  }

  try {
    const result = await accountService.verifyPassword(identifier, password);

    if (result.success) {
      res.status(200).json({ success: true, userID: result.userID });
    } else {
      res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Error in accountController:', error);
    res.status(500).json({ success: false, message: 'An error occurred while verifying the password.' });
  }
};

