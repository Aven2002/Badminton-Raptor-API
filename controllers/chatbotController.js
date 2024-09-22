const axios = require('axios');
const chatbotService = require('../services/chatbotService');

const STATES = {
    INITIAL: 'initial',
    RECOMMEND: 'recommend',
    INQUIRE: 'inquire',
    STRING_ADVICE: 'stringAdvice',
    AWAITING_EQUIPMENT_NAME: 'awaitingEquipmentName',
    RECOMMEND_FORM: 'recommendForm',
    STRING_ADVICE_FORM: 'stringAdviceForm'
};

exports.handleChat = async (req, res) => {
    const { userChoice, equipmentName, currentState, priceRange, selectedBrands, selectedCategory, playingStyle } = req.body;

    // Handle initial request or restart
    if (currentState === STATES.INITIAL && !userChoice) {
        return res.json({
            message: 'Hi, what can I help you with?',
            options: ['Recommend Equipment', 'Search Equipment', 'String Advice'],
        });
    }

    // Handle user choice for recommending equipment
    if (currentState === STATES.INITIAL && userChoice === 'Recommend Equipment') {
        try {
            // Fetch equipment data from the API
            const response = await axios.get('http://localhost:3000/api/equipment');
            const allEquipment = response.data;

            // Extract unique brands and categories
            const brands = [...new Set(allEquipment.map(equip => equip.equipBrand))];
            const categories = [...new Set(allEquipment.map(equip => equip.equipCategory))];

            return res.json({
                message: 'Great! I can recommend some equipment for you. Please fill in your preferences.',
                formFields: {
                    priceRange: { min: 0, max: 2000 },
                    brands: brands,
                    categories: categories
                },
                nextState: STATES.RECOMMEND_FORM
            });
        } catch (error) {
            console.error('Error fetching equipment data:', error);
            return res.json({
                message: 'Could not fetch equipment data. Please try again later.',
                nextState: STATES.INITIAL
            });
        }
    }

    // Handle user preferences for equipment recommendations
    if (currentState === STATES.RECOMMEND_FORM) {
        if (!priceRange || !selectedBrands || !selectedCategory) {
            return res.json({
                message: 'Please provide all necessary preferences for recommendations.',
                nextState: STATES.RECOMMEND_FORM
            });
        }

        try {
            // Generate equipment recommendations based on the preferences
            const recommendations = await chatbotService.generateChatRecommendation(priceRange, selectedBrands, selectedCategory);

            if (recommendations.length === 0) {
                return res.status(404).json({
                    message: 'No equipment meets your criteria.'
                });
            }

            return res.json({
                message: 'Here are some recommendations based on your preferences:',
                equipment: recommendations,
                nextState: STATES.INITIAL
            });
        } catch (error) {
            console.error('Error generating recommendations:', error);
            return res.json({
                message: 'Could not generate recommendations. Please try again later.',
                nextState: STATES.INITIAL
            });
        }
    }


    // Handle user choice for inquiring about specific equipment
    if (currentState === STATES.INITIAL && userChoice === 'Search Equipment') {
        return res.json({
            message: 'Please provide the keyword of the equipment you want to know about.',
            nextState: STATES.AWAITING_EQUIPMENT_NAME
        });
    }

    // Handle user input when equipment name is expected
    if (currentState === STATES.AWAITING_EQUIPMENT_NAME) {
        if (!equipmentName) {
            return res.json({
                message: 'You need to provide the keyword of the equipment.',
                nextState: STATES.AWAITING_EQUIPMENT_NAME
            });
        }

        try {
            // Normalize the equipment name
            const normalizedEquipmentName = equipmentName.trim().toLowerCase();
            const equipmentIDs = await chatbotService.getEquipmentIDByName(normalizedEquipmentName);
            
            if (!equipmentIDs || equipmentIDs.length === 0) {
                return res.json({
                    message: 'No equipment found with that keyword. Please try again.',
                    nextState: STATES.AWAITING_EQUIPMENT_NAME
                });
            }
        
            // Limit to a maximum of 5 equipment IDs
            const limitedEquipmentIDs = equipmentIDs.slice(0, 5);
        
            // Fetch details for the limited equipment IDs
            const equipmentDetailsPromises = limitedEquipmentIDs.map(id => chatbotService.getEquipmentDetailsByID(id));
            const equipmentDetailsArray = await Promise.all(equipmentDetailsPromises);
            
            // Prepare the response with all equipment details
            const equipmentDetailsResponse = equipmentDetailsArray.map(details => ({
                equipmentName: details.equipment.equipName,
                equipmentPrice: details.equipment.equipPrice,
                equipmentImgPath: details.equipment.equipImgPath,
                link: {
                    url: `/equipment/${details.equipment.equipID}`,
                    text: 'View Details'
                }
            }));
        
            return res.json({
                message: 'Here are the basic information of relevant equipment:',
                equipmentDetails: equipmentDetailsResponse,
                nextState: STATES.INITIAL
            });
        } catch (error) {
            console.error('Error fetching equipment details:', error);
            return res.json({
                message: 'Could not fetch equipment details. Please try again later.',
                nextState: STATES.INITIAL
            });
        }C     
    }

// Handle user request for string advice
if (currentState === STATES.INITIAL && userChoice === 'String Advice') {
    try {
        // Fetch equipment data from the API
        const response = await axios.get('http://localhost:3000/api/equipment');
        const allEquipment = response.data;

        // Filter equipment where the category is 'Racquet'
        const racquetEquipment = allEquipment.filter(equip => equip.equipCategory === 'Racquet').map(equip => equip.equipName);;
        
        // Store the filtered racquet equipment
        this.equipment = racquetEquipment;

        // Define play style options
        const playStyleOptions = [
            'Fast attacking',
            'Deceptive stroke',
            'Defensive straightforward',
        ];

        return res.json({
            message: 'Great! I can recommend string and tension for you. Please fill in the information.',
            formFields: {
                racquet: racquetEquipment,
                playStyle: playStyleOptions 
            },
            nextState: STATES.STRING_ADVICE_FORM
        });
    } catch (error) {
        console.error('Error fetching string advice:', error.message);
        return res.json({
            message: 'Could not fetch string advice. Please try again later.',
            nextState: STATES.INITIAL
        });
    }
}

// Handle user preferences for equipment recommendations
if (currentState === STATES.STRING_ADVICE_FORM) {
    if (!equipmentName || !playingStyle) {
        return res.json({
            message: 'Please provide both the equipment name and playing style for string advice.',
            nextState: STATES.STRING_ADVICE
        });
    }

    const equipmentID = await chatbotService.getEquipmentIDByName(equipmentName);

    try {
        // Call the service to get string advice
        const adviceMessage = await chatbotService.getStringAdvice(equipmentID, playingStyle);

        // Send the response back to the client
        return res.json({
            message: adviceMessage,
            nextState: STATES.INITIAL
        });
    } catch (error) {
        console.error('Error fetching string advice:', error.message);
        return res.json({
            message: 'Could not fetch string advice. Please try again later.',
            nextState: STATES.INITIAL
        });
    }
}

    // Handle cases where user choice is not recognized
    return res.json({
        message: 'Sorry, I did not understand your request. Please choose an option.',
        nextState: currentState
    });
};





