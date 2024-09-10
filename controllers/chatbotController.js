const chatbotService = require('../services/chatbotService');

const STATES = {
    INITIAL: 'initial',
    RECOMMEND: 'recommend',
    INQUIRE: 'inquire',
    AWAITING_EQUIPMENT_NAME: 'awaitingEquipmentName'
};

exports.handleChat = async (req, res) => {
    const { userChoice, equipmentName, currentState } = req.body;

    // Handle initial request or restart
    if (!currentState) {
        return res.json({
            message: 'Hi, what can I help you with?',
            options: ['Recommend Equipment', 'Search Equipment'],
            nextState: STATES.INITIAL
        });
    }

    // Handle user choice for recommending equipment
    if (currentState === STATES.INITIAL && userChoice === 'Recommend Equipment') {
        return res.json({
            message: 'Great! I can recommend some equipment for you. Please provide your preferences.',
            options: ['Price Range', 'Preferred Brand', 'Product Category'],
            nextState: STATES.RECOMMEND
        });
    }

    // Handle user choice for inquiring about specific equipment
    if (currentState === STATES.INITIAL && userChoice === 'Search Equipment') {
        return res.json({
            message: 'Please provide the name of the equipment you want to know about.',
            nextState: STATES.AWAITING_EQUIPMENT_NAME
        });
    }

    // Handle user input when equipment name is expected
    if (currentState === STATES.AWAITING_EQUIPMENT_NAME) {
        if (!equipmentName) {
            return res.json({
                message: 'You need to provide the name of the equipment.',
                nextState: STATES.AWAITING_EQUIPMENT_NAME
            });
        }

        try {
            // Normalize the equipment name
            const normalizedEquipmentName = equipmentName.trim().toLowerCase();
            const equipmentID = await chatbotService.getEquipmentIDByName(normalizedEquipmentName);
            if (!equipmentID) {
                return res.json({
                    message: 'No equipment found with that name. Please try again.',
                    nextState: STATES.AWAITING_EQUIPMENT_NAME
                });
            }

            // Fetch equipment details
            const equipmentDetails = await chatbotService.getEquipmentDetailsByID(equipmentID);

            return res.json({
                message: 'Here are the details for the requested equipment:',
                equipmentName: equipmentDetails.equipment.equipName,
                equipmentPrice: equipmentDetails.equipment.equipPrice,
                equipmentImgPath: equipmentDetails.equipment.equipImgPath,
                link: {
                    url: `/equipment/${equipmentID}`,
                    text: 'View Details'
                },
                nextState: STATES.INITIAL
            });
        } catch (error) {
            console.error('Error fetching equipment details:', error);
            return res.json({
                message: 'Could not fetch equipment details. Please try again later.',
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
