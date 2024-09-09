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

exports.deleteRecommendation = (req, res) => {
  const id = req.params.id;
  recommendationService.deleteRecommendationById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Recommendation deleted' });
  });
};


exports.generateRecommendations = async (req, res) => {
  try {
    const userID = req.body.userID; 

    const recommendations = await recommendationService.generateRecommendations(userID);

    res.status(200).json({ message: 'Recommendations Created', recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


