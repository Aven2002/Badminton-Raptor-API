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

exports.createAccount = (req, res) => {
  const newUser = {
    profileImg: req.body.profileImg ,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    age: req.body.age,
    race: req.body.race,
    contactNum: req.body.contactNum,
    dob: req.body.dob,
  };

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
