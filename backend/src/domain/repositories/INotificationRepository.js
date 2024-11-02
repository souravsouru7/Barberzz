class INotificationRepository {
    async createNotification(notification) {}
    async getNotifications(userId) {}
    async markAsRead(notificationId) {}
    async markAllAsRead(userId) {}
    async deleteNotification(notificationId) {}
  }
  
  module.exports = INotificationRepository;