const express = require('express');
const router = express.Router();
const NotificationRepositoryImpl = require('../../infrastructure/db/NotificationRepositoryImpl');
const NotificationController = require('../controllers/NotificationController');
const GetShopNotificationsUseCase = require('../../application/use-case/notification/GetShopNotificationsUseCase');
const MarkNotificationAsReadUseCase = require('../../application/use-case/notification/MarkNotificationAsReadUseCase');
const CreateNotificationUseCase = require('../../application/use-case/notification/CreateNotificationUseCase');

// Initialize repositories and use cases
const notificationRepository = new NotificationRepositoryImpl();
const getShopNotificationsUseCase = new GetShopNotificationsUseCase(notificationRepository);
const markNotificationAsReadUseCase = new MarkNotificationAsReadUseCase(notificationRepository);
const createNotificationUseCase = new CreateNotificationUseCase(notificationRepository);

const notificationController = new NotificationController(
  getShopNotificationsUseCase,
  markNotificationAsReadUseCase,
  createNotificationUseCase
);

// Routes with error handling
router.get('/shop/:shopId', async (req, res, next) => {
  try {
    await notificationController.getShopNotifications(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:notificationId/read', async (req, res, next) => {
  try {
    await notificationController.markAsRead(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;