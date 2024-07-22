const equipmentService = require('../services/equipmentService');

exports.getAllEquipment = (req, res) => {
  equipmentService.getAllEquipment((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.createEquipment = (req, res) => {
  const newItem = req.body;
  equipmentService.createEquipment(newItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...newItem });
  });
};

exports.updateEquipment = (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  equipmentService.updateEquipment(id, updatedItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Equipment updated', updatedItem });
  });
};

exports.deleteEquipment = (req, res) => {
  const id = req.params.id;
  equipmentService.deleteEquipment(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Equipment deleted' });
  });
};
