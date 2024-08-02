const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const equipmentService = require('../services/equipmentService'); 

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
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  const equipment = JSON.parse(req.body.equipment);
  const details = JSON.parse(req.body.details);
  const detailTable = req.body.detailTable;
  const equipImgPath = req.file ? `${req.file.destination.split('\\').pop()}/${req.file.filename}` : ''; // Ensure path is correct

  equipmentService.createEquipment({
    ...equipment,
    equipImgPath,
  }, details, detailTable, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Equipment created successfully' });
  });
};

exports.updateEquipment = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  let imgPath;
  if (req.file) {
    imgPath = req.file.filename;
  } else {
    imgPath = updatedData.equipImgPath; // Use existing image path if no new image is uploaded
  }

  const updatedItem = {
    equipName: updatedData.equipName,
    equipCategory: updatedData.equipCategory,
    equipBrand: updatedData.equipBrand,
    equipImgPath: imgPath,
    equipPrice: updatedData.equipPrice
  };

  // Fetch existing equipment to check if equipName has changed
  equipmentService.getEquipmentById(id, (err, existingEquipment) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching existing equipment', error: err });
    }

    const oldImgName = existingEquipment.equipImgPath;
    const newImgName = `${updatedItem.equipName}${path.extname(oldImgName)}`;

    if (oldImgName && oldImgName !== newImgName) {
      // Construct full paths
      const oldPath = path.join(__dirname, '..', 'assets', oldImgName);
      const newPath = path.join(__dirname, '..', 'assets', updatedItem.equipCategory, newImgName);

      // Ensure old file exists before renaming
      fs.access(oldPath, fs.constants.F_OK, (err) => {
        if (err) {
          return res.status(404).json({ message: 'Original image file not found', error: err });
        }

        // Rename the file on the file system
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error renaming image file', error: err });
          }

          updatedItem.equipImgPath = newImgName;
          updateEquipmentAndDetails(id, updatedItem, updatedData.details, res);
        });
      });
    } else {
      updateEquipmentAndDetails(id, updatedItem, updatedData.details, res);
    }
  });
};

function updateEquipmentAndDetails(id, updatedItem, detailsString, res) {
  equipmentService.updateEquipment(id, updatedItem, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating equipment', error: err });
    }

    const details = detailsString ? JSON.parse(detailsString) : null;
    if (details) {
      equipmentService.updateEquipmentDetails(id, updatedItem.equipCategory, details, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating equipment details', error: err });
        }
        res.status(200).json({ message: 'Equipment updated successfully', result });
      });
    } else {
      res.status(200).json({ message: 'Equipment updated successfully', result });
    }
  });
}

function updateEquipmentAndDetails(id, updatedItem, detailsString, res) {
  equipmentService.updateEquipment(id, updatedItem, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating equipment', error: err });
    }

    const details = detailsString ? JSON.parse(detailsString) : null;
    if (details) {
      equipmentService.updateEquipmentDetails(id, updatedItem.equipCategory, details, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating equipment details', error: err });
        }
        res.status(200).json({ message: 'Equipment updated successfully', result });
      });
    } else {
      res.status(200).json({ message: 'Equipment updated successfully', result });
    }
  });
}

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
    let filename = `Equipment_Details_${id}.pdf`;
    filename = encodeURIComponent(filename);

    // Set the headers to tell the browser it's a PDF
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    // Stream the PDF into the response
    doc.pipe(res);

    // Add background image for the PDF
    // Assuming you have a background image for all pages
    const backgroundImagePath = path.resolve(__dirname, '../assets/Pdf_Background.png');

    // Function to add a background image to the page
    const addBackgroundImage = () => {
      doc.image(backgroundImagePath, 0, 0, { width: doc.page.width, height: doc.page.height });
    };

    // Page 1: Image
    addBackgroundImage();
    const imagePath = path.resolve(__dirname, `../assets/${data.equipment.equipCategory}/${data.equipment.equipName}.png`);
    
    // Log the image path for debugging
    console.log('Image Path:', imagePath);

    if (fs.existsSync(imagePath)) {
      console.log('Image file exists');
      const imageWidth = doc.page.width * 0.6; // 60% of the page width
      const imageHeight = (imageWidth * 300) / 300; // Maintain aspect ratio (original height of 300 assumed)
      const imageX = (doc.page.width - imageWidth) / 2; // Center the image horizontally
      const imageY = (doc.page.height - imageHeight) / 2; // Center the image vertically

      doc.image(imagePath, imageX, imageY, { width: imageWidth, height: imageHeight });
      doc.addPage();
    } else {
      console.log('Image file does not exist');
      doc.addPage(); // Ensure the document still continues to the next page
    }

    // Page 2: Content
    addBackgroundImage(); // Optional: add background image again on this page
    doc.fontSize(25).text(`Equipment Details`, { align: 'center' });
    doc.moveDown();

    // General Information
    doc.fontSize(20).text(`General Information`, { underline: true });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica-Bold').text(`Name: `, { continued: true }).font('Helvetica').text(`${data.equipment.equipName}`);
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').text(`Category: `, { continued: true }).font('Helvetica').text(`${data.equipment.equipCategory}`);
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').text(`Price: `, { continued: true }).font('Helvetica').text(`RM ${data.equipment.equipPrice.toFixed(2)}`);
    doc.moveDown();

    // Specific Information
    doc.fontSize(20).text(`Specific Information`, { underline: true });
    doc.moveDown();
    for (const key in data.details) {
      const formattedKey = formatKey(key);
      doc.fontSize(12).font('Helvetica-Bold').text(`${formattedKey}: `, { continued: true }).font('Helvetica').text(`${data.details[key]}`);
      doc.moveDown(0.5);
    }

    // Finalize the PDF and end the stream
    doc.end();
  });
};

// Helper function to format column names
function formatKey(key) {
  return key.replace('equipID', 'Equipment ID')
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
}
