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

exports.generateRecommendations = async (userID) => {
  if (!userID) {
    return res.status(400).json({ error: 'UserID is required' });
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
      await insertOrUpdateRecommendations(userID, recommendations, {}, {min: 0, max: 0}, {});
      return recommendations;
    }

    // Step 2: Calculate Scores
    const { categoryScores, brandScores, recencyScores } = calculateScores(userFavoritesResult);

    // Calculate dynamic price range based on user favorites' prices
    const medianPrice = calculateMedian(userFavoritesResult.map(fav => fav.equipPrice));
    const priceRange = calculateDynamicPriceRange(medianPrice);

    // Step 3: Get Top Recommendations
    const recommendations = await getTopRecommendations(categoryScores, brandScores, priceRange, recencyScores);

    // Step 4: Insert or Update Recommendations
    await insertOrUpdateRecommendations(userID, recommendations, categoryScores, priceRange, brandScores);

    return recommendations;
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

const getTopRecommendations = async (categoryScores, brandScores, priceRange, recencyScores) => {
  const query = `SELECT * FROM equipment WHERE equipPrice BETWEEN ? AND ?`;
  const equipmentItemsResult = await new Promise((resolve, reject) => {
    db.query(query, [priceRange.min, priceRange.max], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

  const equipmentItems = equipmentItemsResult;

  const weightedRecommendations = equipmentItems.map(equip => {
    const priceScore = calculatePriceScore(equip.equipPrice, priceRange);
    const categoryScore = categoryScores[equip.equipCategory] || 0;
    const brandScore = brandScores[equip.equipBrand] || 0;
    const recencyScore = recencyScores[equip.equipID] || 0;

    const finalScore = (priceScore * 0.3) + (categoryScore * 0.25) + (brandScore * 0.25) + (recencyScore * 0.2);
    return { ...equip, finalScore };
  });

  weightedRecommendations.sort((a, b) => b.finalScore - a.finalScore);
  let topRecommendations = weightedRecommendations.slice(0, 30);

  // If fewer than 30 items are available, fetch additional random items
  if (topRecommendations.length < 30) {
    const additionalItemsNeeded = 30 - topRecommendations.length;
    const randomEquipment = await getRandomEquipment(additionalItemsNeeded);
    topRecommendations = [...topRecommendations, ...randomEquipment];
  }

  return topRecommendations;
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
  const recommendationIDs = recommendations.map(equip => equip.equipID);
  const existingRecommendationsResult = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM recommendations WHERE userID = ?', [userID], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

  const existingRecommendations = existingRecommendationsResult;

  const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

  if (existingRecommendations.length > 0) {
    await new Promise((resolve, reject) => {
      db.query('UPDATE recommendations SET last_shown_at = ?, category_scores = ?, price_scores = ?, feature_scores = ?, final_scores = ? WHERE userID = ?', 
        [currentTimestamp, JSON.stringify(categoryScores), JSON.stringify(priceRange), JSON.stringify(brandScores), JSON.stringify(recommendations.reduce((acc, item) => ({ ...acc, [item.equipID]: item.finalScore }), {})), userID], 
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
    });
  } else {
    const newRecommendation = {
      userID,
      equipment_ids: JSON.stringify(recommendationIDs),
      rating: 0,
      category_scores: JSON.stringify(categoryScores),
      price_scores: JSON.stringify(priceRange),
      feature_scores: JSON.stringify(brandScores),
      final_scores: JSON.stringify(recommendations.reduce((acc, item) => ({ ...acc, [item.equipID]: item.finalScore }), {}))
    };
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO recommendations SET ?', [newRecommendation], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }
};

const getRandomEquipment = async (limit) => {
  const query = `SELECT * FROM equipment ORDER BY RAND() LIMIT ?`;
  const randomEquipmentResult = await new Promise((resolve, reject) => {
    db.query(query, [limit], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

  // Debugging: Check the structure of the fetched random equipment items
  console.log('Random Equipment Result:', randomEquipmentResult);

  return randomEquipmentResult;
};


















