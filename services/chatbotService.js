const axios = require('axios');
const db = require('../config/db'); 

const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, '');

const getEquipmentIDByName = async (equipmentName) => {
    try {
        // Fetch all equipment from the API
        const response = await axios.get('http://localhost:3000/api/equipment');
        const allEquipment = response.data;

        // Normalize the input name
        const normalizedName = normalizeString(equipmentName);

        // Find the equipment that matches the normalized name
        const equipment = allEquipment.find(item => 
            normalizeString(item.equipName) === normalizedName
        );
        return equipment ? equipment.equipID : null;
    } catch (error) {
        console.error('Error fetching equipment data:', error);
        throw new Error('Could not fetch equipment data.');
    }
};

const getEquipmentDetailsByID = async (equipmentID) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/equipment/${equipmentID}/details`);
        return response.data;
    } catch (error) {
        console.error('Error fetching equipment details:', error);
        throw new Error('Could not fetch equipment details.');
    }
};

/**
 * Get recommended equipment based on user preferences.
 * @param {string} category - The category of the equipment.
 * @param {string} priceRange - The price range for filtering.
 * @param {string} brand - The preferred brand.
 * @returns {Promise<Array>} - A promise that resolves to an array of recommended equipment.
 */
async function getRecommendedEquipment(category, priceRange, brand) {
    try {
        // Parse priceRange to get min and max prices
        const [minPrice, maxPrice] = priceRange.split('-').map(price => parseFloat(price.trim()));

        // Define the SQL query with placeholders
        let query = `
            SELECT * FROM equipment
            WHERE equipCategory = ?
              AND equipBrand LIKE ?
              AND equipPrice BETWEEN ? AND ?
            ORDER BY equipPrice ASC
            LIMIT 3
        `;

        // Execute the query with the provided parameters
        const results = await db.query(query, [category, `%${brand}%`, minPrice, maxPrice]);

        // Return the top 3 equipment recommendations
        return results;
    } catch (error) {
        console.error('Error fetching recommended equipment:', error);
        throw new Error('Could not fetch recommended equipment. Please try again later.');
    }
}

module.exports = {
    getEquipmentIDByName,
    getEquipmentDetailsByID,
    getRecommendedEquipment
};
