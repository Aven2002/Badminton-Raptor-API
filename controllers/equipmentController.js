const equipmentService = require('../services/equipmentService');
const PDFDocument = require('pdfkit');

exports.getAllEquipment = (req, res) => {
  equipmentService.getAllEquipment((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getEquipmentByCategory = (req, res) => {
  const category = req.params.category; 
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  equipmentService.getEquipmentByCategory(category, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
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

exports.getEquipmentDetails = (req, res) => {
  const id = req.params.id;

  equipmentService.getEquipmentDetails(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

exports.getEquipmentDetailsPDF = (req, res) => {
  const id = req.params.id;

  equipmentService.getEquipmentDetails(id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    const doc = new PDFDocument();
    let filename = `equipment_${id}.pdf`;
    filename = encodeURIComponent(filename);

    // Set the headers to tell the browser it's a PDF
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    // Stream the PDF into the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(25).text(`Equipment Details`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`General Information`, { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${data.equipment.equipName}`);
    doc.text(`Category: ${data.equipment.equipCategory}`);
    doc.text(`Price: ${data.equipment.equipPrice}`);
    doc.moveDown();
    doc.fontSize(20).text(`Specific Information`, { underline: true });
    doc.moveDown();
    for (const key in data.details) {
      doc.fontSize(12).text(`${key}: ${data.details[key]}`);
    }

    // Finalize the PDF and end the stream
    doc.end();
  });
};
