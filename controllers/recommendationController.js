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
    recommendationService.getRecommendation((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.createRecommendation = (req, res) => {

};

exports.deleteRecommendation = (req, res) => {
  const id = req.params.id;
  recommendationService.deleteRecommendation(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Recommendation deleted' });
  });
};

