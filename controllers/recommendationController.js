const recommendationService = require('../services/recommendationService'); 

exports.getAllRecommendation = (req, res) => {
    recommendationService.getAllRecommendation((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getRecommendation = (req, res) => {
  const id = req.params.id;
    recommendationService.getRecommendationById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.createRecommendation = (req, res) => {
  const newItem = {
    userID: req.body.userID,
    rating: req.body.rating,
  };
  const equipmentIds = req.body.equipmentIds;

  recommendationService.createRecommendation(newItem, equipmentIds, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Recommendation created', recommendationID: result.insertId });
  });
};


exports.deleteRecommendation = (req, res) => {
  const id = req.params.id;
  recommendationService.deleteRecommendationById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Recommendation deleted' });
  });
};


