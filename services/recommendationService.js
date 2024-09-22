const db = require('../config/db');
const moment = require('moment'); 

exports.getAllRecommendation = (callback) => {
  const sql = `SELECT * FROM recommendations`;
  db.query(sql, callback);
};

exports.getRecommendationById = (id, callback) => {
  const sql = `
    SELECT * FROM recommendations WHERE recommendationID = ?`;
  db.query(sql, [id], callback);
};

exports.deleteRecommendationById = (id, callback) => {
  const sql = 'DELETE FROM recommendations WHERE recommendationID = ?';
  db.query(sql, [id], callback);
};


exports.updateRating = async (userID, recommendationID, rating) => {
  try {
    // Validate input parameters
    if (!userID || !recommendationID || !rating) {
      throw new Error('Missing required parameters: userID, recommendationID, or rating.');
    }

    // Check if userID, recommendationID, and rating are valid numbers
    if (isNaN(userID) || isNaN(recommendationID) || isNaN(rating)) {
      throw new Error('Invalid input: userID, recommendationID, and rating must be valid numbers.');
    }

    // Update the rating for the given userID and recommendationID
    const query = `
      UPDATE recommendations 
      SET rating = ? 
      WHERE userID = ? AND recommendationID = ?
    `;
    const result = await db.query(query, [rating, userID, recommendationID]);

    // Check if the recommendation was found and updated
    if (result.affectedRows === 0) {
      throw new Error('No matching recommendation found for the provided userID and recommendationID.');
    }

    return result;
  } catch (error) {
    throw error;
  }
};


exports.generateRecommendations = async (userID) => {
  if (!userID) {
    return { status: 400, json: { error: 'UserID is required' } };
  }
  try {
    // Step 1: Extract User Preferences with Equip Price, Category, and Brand
    const userFavoritesResult = await new Promise((resolve, reject) => {
      db.query(`
        SELECT f.favoriteID, f.userID, f.equipID, f.created_at, e.equipPrice, e.equipCategory, e.equipBrand
        FROM favorite f
        JOIN equipment e ON f.equipID = e.equipID
        WHERE f.userID = ?
      `, [userID], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    if (userFavoritesResult.length === 0) {
      // If no favorites, directly fetch 30 random items
      const recommendations = await getRandomEquipment(30);
      const recommendationID = await insertOrUpdateRecommendations(userID, recommendations, {}, {min: 0, max: 0}, {});
      return { recommendations, recommendationID };
    }

    // Step 2: Calculate Scores
    const { categoryScores, brandScores, recencyScores } = calculateScores(userFavoritesResult);

    // Calculate dynamic price range based on user favorites' prices
    const medianPrice = calculateMedian(userFavoritesResult.map(fav => fav.equipPrice));
    const priceRange = calculateDynamicPriceRange(medianPrice);

    // Step 3: Get Top Recommendations
    const { topRecommendations, recommendations } = await getTopRecommendations(userID,categoryScores, brandScores, priceRange, recencyScores);

    // Step 4: Insert or Update Recommendations
    const recommendationID = await insertOrUpdateRecommendations(userID, topRecommendations, categoryScores, priceRange, brandScores);

    return { recommendations, recommendationID };
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error.');
  }
};


// Helper functions
const calculateMedian = (prices) => {
  if (prices.length === 0) return 0;

  const sortedPrices = prices.slice().sort((a, b) => a - b);
  const mid = Math.floor(sortedPrices.length / 2);

  if (sortedPrices.length % 2 === 0) {
    return (sortedPrices[mid - 1] + sortedPrices[mid]) / 2;
  } else {
    return sortedPrices[mid];
  }
};

const calculateDynamicPriceRange = (medianPrice) => {
  const rangeMargin = 200; // Example margin
  return {
    min: medianPrice - rangeMargin,
    max: medianPrice + rangeMargin
  };
};

const calculateScores = (userFavorites) => {
  const categoryCount = {};
  const brandCount = {};
  const recencyScores = {};

  const now = new Date();

  userFavorites.forEach(fav => {
    const category = fav.equipCategory || 'Unknown';
    const brand = fav.equipBrand || 'Unknown';

    categoryCount[category] = (categoryCount[category] || 0) + 1;
    brandCount[brand] = (brandCount[brand] || 0) + 1;

    const createdAt = new Date(fav.created_at);
    const ageInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
    recencyScores[fav.equipID] = Math.max(0, 1 - (ageInDays / 30));
  });

  const totalFavorites = userFavorites.length;

  const categoryScores = {};
  const brandScores = {};

  for (const [category, count] of Object.entries(categoryCount)) {
    categoryScores[category] = count / totalFavorites;
  }

  for (const [brand, count] of Object.entries(brandCount)) {
    brandScores[brand] = count / totalFavorites;
  }

  return { categoryScores, brandScores, recencyScores };
};

const getTopRecommendations = async (userID, categoryScores, brandScores, priceRange, recencyScores) => {
  try {
    // Step 1: Fetch equipment items based on price range excluding favorites
    const favoriteEquipIDs = await fetchUserFavorites(userID);
    
    let query = `SELECT * FROM equipment WHERE equipPrice BETWEEN ? AND ?`;
    const params = [priceRange.min, priceRange.max];

    if (favoriteEquipIDs.length > 0) {
      const placeholders = favoriteEquipIDs.map(() => '?').join(',');
      query += ` AND equipID NOT IN (${placeholders})`;
      params.push(...favoriteEquipIDs); // Spread the favorite IDs into the params
    }

    // Fetch equipment items
    const equipmentItemsResult = await new Promise((resolve, reject) => {
      db.query(query, params, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    // Step 2: Calculate weighted recommendations
    const weightedRecommendations = equipmentItemsResult.map(equip => {
      const priceScore = calculatePriceScore(equip.equipPrice, priceRange);
      const categoryScore = categoryScores[equip.equipCategory] || 0;
      const brandScore = brandScores[equip.equipBrand] || 0;
      const recencyScore = recencyScores[equip.equipID] || 0;

      const finalScore = (priceScore * 0.3) + (categoryScore * 0.25) + (brandScore * 0.25) + (recencyScore * 0.2);
      return { ...equip, finalScore };
    });

    // Step 3: Sort and select top recommendations
    weightedRecommendations.sort((a, b) => b.finalScore - a.finalScore);
    const topRecommendations = weightedRecommendations.slice(0, 30);

    // Step 4: Prepare the recommendations list
    let recommendations = [...topRecommendations];

    // If fewer than 30 items are available, fetch additional random items
    if (topRecommendations.length < 30) {
      const additionalItemsNeeded = 30 - topRecommendations.length;
      const randomEquipment = await getRandomEquipment(additionalItemsNeeded);
      recommendations = [...topRecommendations, ...randomEquipment];
    }

    return { topRecommendations, recommendations };
    
  } catch (error) {
    console.error('Error fetching top recommendations:', error);
    throw new Error('Internal Server Error.');
  }
};

const fetchUserFavorites = async (userID) => {
  const response = await fetch(`http://localhost:3000/api/favorite/${userID}`);
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  const favorites = await response.json();
  return favorites.map(item => item.equipID); // Return only the equipIDs
};


const calculatePriceScore = (price, priceRange) => {
  if (price < priceRange.min || price > priceRange.max) {
    return 0;
  }
  const rangeSpan = priceRange.max - priceRange.min;
  const normalizedPrice = (price - priceRange.min) / rangeSpan;
  return normalizedPrice;
};

const insertOrUpdateRecommendations = async (userID, recommendations, categoryScores, priceRange, brandScores) => {
  const recommendationIDs = recommendations.map(equip => equip.equipID).sort();
  const newFinalScores = recommendations.reduce((acc, item) => ({ ...acc, [item.equipID]: item.finalScore }), {});

  // Fetch existing recommendations
  const existingRecommendationsResult = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM recommendations WHERE userID = ?', [userID], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

  const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

  if (existingRecommendationsResult.length > 0) {
    for (const existingRecommendation of existingRecommendationsResult) {
      const existingEquipmentIDs = JSON.parse(existingRecommendation.equipment_ids).sort();

      // Compare existing equipment IDs with new ones using string comparison
      const equipmentIDsMatch = JSON.stringify(existingEquipmentIDs) === JSON.stringify(recommendationIDs);

      if (equipmentIDsMatch) {
        // Equipment IDs match, update the last_shown_at timestamp only for the matched recommendation
        await new Promise((resolve, reject) => {
          db.query('UPDATE recommendations SET last_shown_at = ? WHERE recommendationID = ?', 
            [currentTimestamp, existingRecommendation.recommendationID], 
            (error, results) => {
              if (error) return reject(error);
              resolve(results);
            });
        });

        // Return the existing recommendationID
        return existingRecommendation.recommendationID;
      }
    }
  }

  // If no match or no existing recommendation, insert a new recommendation
  const newRecommendation = {
    userID,
    equipment_ids: JSON.stringify(recommendationIDs),
    rating: 0,
    category_scores: JSON.stringify(categoryScores),
    price_scores: JSON.stringify(priceRange),
    feature_scores: JSON.stringify(brandScores),
    final_scores: JSON.stringify(newFinalScores),
    last_shown_at: currentTimestamp // Set the timestamp for new recommendations
  };

  const insertResult = await new Promise((resolve, reject) => {
    db.query('INSERT INTO recommendations SET ?', [newRecommendation], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

  // Return the newly inserted recommendationID
  return insertResult.insertId;
};



const getRandomEquipment = async (limit) => {
  const query = `SELECT * FROM equipment ORDER BY RAND() LIMIT ?`;
  const randomEquipmentResult = await new Promise((resolve, reject) => {
    db.query(query, [limit], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

  return randomEquipmentResult;
};


















