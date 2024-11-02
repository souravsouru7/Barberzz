class NotificationController {
  constructor(
    getShopNotificationsUseCase,
    markNotificationAsReadUseCase,
    createNotificationUseCase
  ) {
    this.getShopNotificationsUseCase = getShopNotificationsUseCase;
    this.markNotificationAsReadUseCase = markNotificationAsReadUseCase;
    this.createNotificationUseCase = createNotificationUseCase;
  }

  async getShopNotifications(req, res) {
    try {
      const shopId = req.params.shopId;
      const { limit = 10, offset = 0, type } = req.query;
      
      const notifications = await this.getShopNotificationsUseCase
        .execute(shopId, {
          limit: parseInt(limit),
          offset: parseInt(offset),
          type
        });
      
      res.json(notifications);
    } catch (error) {
      console.error('Error in getShopNotifications:', error);
      res.status(500).json({ 
        error: 'Failed to fetch notifications',
        details: error.message 
      });
    }
  }

  async markAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      const updatedNotification = await this.markNotificationAsReadUseCase
        .execute(notificationId);
      
      if (!updatedNotification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      
      res.json(updatedNotification);
    } catch (error) {
      console.error('Error in markAsRead:', error);
      res.status(500).json({ 
        error: 'Failed to mark notification as read',
        details: error.message 
      });
    }
  }
}

module.exports = NotificationController;