const express = require('express');
const router = express.Router();
const { MongoDBAnalyticsRepository } = require('../../infrastructure/db/MongoAnalyticsRepository');
const GetShopAnalyticsUseCase = require('../../application/use-case/Anylitical/get-shop-analytics');
const AnalyticsController = require('../controllers/AnalyticsController');

// Initialize repositories and use cases
const analyticsRepository = new MongoDBAnalyticsRepository();
const getShopAnalyticsUseCase = new GetShopAnalyticsUseCase(analyticsRepository);
const analyticsController = new AnalyticsController(getShopAnalyticsUseCase);

// Define routes
router.get('/shops/:shopId/analytics', analyticsController.getShopAnalytics.bind(analyticsController));

module.exports = router;