const accountService = require('../services/accountService');

exports.login = (req, res) => {
  const { identifier, password } = req.body;
  accountService.getAllAccount((err, accounts) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
    const user = accounts.find(user => user.username === identifier || user.email === identifier);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Incorrect username or password' });
    }
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Incorrect username or password' });
    }
    // Successful login
    return res.status(200).json({ success: true, message: 'Login successful' });
  });
};
