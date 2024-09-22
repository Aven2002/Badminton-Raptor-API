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

        // Find all equipment that matches the normalized name
        const matchingEquipment = allEquipment.filter(item => 
            normalizeString(item.equipName).includes(normalizedName)
        );

        // Extract and return the equipment IDs
        const equipmentIDs = matchingEquipment.map(item => item.equipID);
        return equipmentIDs.length > 0 ? equipmentIDs : null;
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
            .slice(0, 5)
            .map(equip => ({
                equipmentName: equip.equipName,
                equipmentPrice: equip.equipPrice, 
                equipmentImgPath: equip.equipImgPath,
                link: {
                    url: `/equipment/${equip.equipID}`,
                    text: 'View Details'
                }
            }));

        return filteredEquipment;
    } catch (error) {
        console.error('Error fetching or filtering equipment:', error);
        throw new Error('Unable to fetch recommendations');
    }
};

const getStringAdvice = async (equipmentID, playingStyle) => {
    try {
        const equipmentResponse = await getEquipmentDetailsByID(equipmentID);

        if (!equipmentResponse || !equipmentResponse.details || !equipmentResponse.details.stringAdvice) {
            throw new Error('Details not found in equipment response');
        }

        const stringAdvice = equipmentResponse.details.stringAdvice;
        const stringAdviceRange = stringAdvice.replace(' lbs', '').split('-').map(Number);
        const minTension = stringAdviceRange[0];
        const maxTension = stringAdviceRange[1];
        let tensionAdvice = '';
        let category = '';

        // Determine tension range based on playing style
        if (playingStyle === 'Fast attacking') {
            tensionAdvice = `Recommended tension: ${maxTension - 2} - ${maxTension} lbs`;
            category = 'Power';
        } else if (playingStyle === 'Deceptive stroke') {
            tensionAdvice = `Recommended tension: ${Math.round((minTension + maxTension) / 2)} - ${Math.round((minTension + maxTension) / 2) + 2} lbs`;
            category = 'Control';
        } else if (playingStyle === 'Defensive straightforward') {
            tensionAdvice = `Recommended tension: ${minTension} - ${Math.round((minTension + maxTension) / 2)} lbs`;
            category = 'Durability';
        } else {
            throw new Error('Invalid playing style');
        }

        // Generate advice message
        let adviceMessage = `Based on your selections:\n\nFor a ${playingStyle} style player, consider using ${category.toLowerCase()} strings.\n\n`;

        // Category-specific advice
        if (category === 'Power') {
            adviceMessage += 'Power Strings: These strings are designed to inject pace and power into your game.\n\nPopular Power Strings Include:\n- Yonex BG80 Power\n- Yonex BG66 Ultimax\n- Yonex Aerosonic\n- Yonex Exbolt 65';
        } else if (category === 'Control') {
            adviceMessage += 'Control Strings: Designed for better bite on the shuttle.\n\nPopular Control Strings Include:\n- Yonex Aerobite Boost\n- Yonex Aerobite\n- Ashaway Rogue Duo\n- Yonex BG80';
        } else if (category === 'Durability') {
            adviceMessage += 'Durability Strings: Made for players who want longevity from their strings.\n\nPopular Durability Strings Include:\n- Yonex BG65Ti Titanium\n- Yonex Exbolt 68\n- Ashaway Zymax 69 Fire';
        }

        adviceMessage += `\n\n${tensionAdvice}`;
        
        return adviceMessage;
    } catch (error) {
        console.error('Error fetching equipment details:', error);
        throw new Error('Unable to fetch string advice');
    }
};



module.exports = {
    getEquipmentIDByName,
    getEquipmentDetailsByID,
    generateChatRecommendation,
    getStringAdvice
};
