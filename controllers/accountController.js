const accountService = require('../services/accountService');

exports.getAllAccount = (req, res) => {
  accountService.getAllAccount((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.createAccount = (req, res) => {
  const newUser = {
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
      return res.status(500).json({ error: err.message });
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
    res.json({ message: 'Accountupdated', updatedItem });
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
