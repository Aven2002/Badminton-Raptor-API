const favoriteService = require('../services/favoriteService');

exports.getAllFavorite = (req, res) => {
  favoriteService.getAllFavorite((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.createFavorite = (req, res) => {
  const newItem = req.body;
  favoriteService.createFavorite(newItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...newItem });
  });
};

exports.updateFavorite = (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  favoriteService.updateFavorite(id, updatedItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Favorite updated', updatedItem });
  });
};

exports.deleteFavorite = (req, res) => {
  const id = req.params.id;
  favoriteService.deleteFavorite(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Favorite deleted' });
  });
};

exports.checkFavorite = (req, res) => {
  const { userID, equipID } = req.query;

  if (!userID || !equipID) {
    return res.status(400).json({ error: 'userID and equipID are required' });
  }

  favoriteService.checkFavorite(userID, equipID, (error, isFavorite) => {
    if (error) {
      console.error('Error checking favorite:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ isFavorite });
  });
};
