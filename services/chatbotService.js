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

const generateChatRecommendation = async (priceRange, selectedBrands, selectedCategory) => {
    try {

        // Convert priceRange values to numbers if they are not already
        const minPrice = Number(priceRange.min);
        const maxPrice = Number(priceRange.max);

        const response = await axios.get('http://localhost:3000/api/equipment');
        const equipment = response.data;

        const filteredEquipment = equipment
            .filter(equip => 
                equip.equipPrice >= minPrice &&
                equip.equipPrice <= maxPrice &&
                (selectedBrands.length === 0 || selectedBrands.includes(equip.equipBrand)) &&
                (selectedCategory === '' || equip.equipCategory === selectedCategory)
            )
            .slice(0, 3)
            .map(equip => ({
                equipName: equip.equipName,  
                equipImgPath: equip.equipImgPath,
                url: `equipment/${equip.equipID}`
            }));

        return filteredEquipment;
    } catch (error) {
        console.error('Error fetching or filtering equipment:', error);
        throw new Error('Unable to fetch recommendations');
    }
};

module.exports = {
    getEquipmentIDByName,
    getEquipmentDetailsByID,
    generateChatRecommendation
};
