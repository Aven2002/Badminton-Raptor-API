const feedbackService = require('../services/feedbackService');

exports.getAllFeedback = (req, res) => {
  feedbackService.getAllFeedback((err, results) => {
    if (err) {
      console.error('Error getting feedback:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getFeedback = (req, res) => {
  const id = req.params.id;
  feedbackService.getFeedback(id, (err, results) => {
    if (err) {
      console.error('Error getting feedback:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.createFeedback = (req, res) => {
  const newFeedback = {
    feedbackCategory: req.body.feedbackCategory, // Use feedbackCategory as per your table
    email: req.body.email,
    contactNum: req.body.contactNum,
    feedbackContent: req.body.feedbackContent // Use feedbackContent as per your table
  };
  feedbackService.createFeedback(newFeedback, (err, result) => {
    if (err) {
      console.error('Error creating feedback:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...newFeedback });
  });
};

exports.changeFeedbackStatus = (req, res) => {
  const id = req.params.id;
  feedbackService.changeFeedbackStatus(id, (err, result) => {
    if (err) {
      console.error('Error updating feedback status:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Feedback Updated : Read' });
  });
};

exports.deleteFeedback = (req, res) => {
  const id = req.params.id;
  feedbackService.deleteFeedback(id, (err, result) => {
    if (err) {
      console.error('Error deleting feedback:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Feedback deleted' });
  });
};
