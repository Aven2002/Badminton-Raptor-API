const express = require('express');
const router = express.Router();
const upload = require('../index');
const equipmentController = require('../controllers/equipmentController');

module.exports = (upload) => {
  const router = express.Router();

  // Route to get all equipment
  router.get('/', equipmentController.getAllEquipment);

  // Route to get detailed information for a specific equipment item
  router.get('/:id/details', equipmentController.getEquipmentDetails);

  // Route to get equipment by category
  router.get('/:category', equipmentController.getEquipmentByCategory);

  // Route to create new equipment
  router.post('/', upload.single('equipImgPath'), equipmentController.createEquipment);

  // Route to update existing equipment
  router.put('/:id', equipmentController.updateEquipment);

  // Route to delete equipment
  router.delete('/:id', equipmentController.deleteEquipment);

  // Route to download equipment
  router.get('/:id/details/pdf', equipmentController.getEquipmentDetailsPDF);

  return router;
};
