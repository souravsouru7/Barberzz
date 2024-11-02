class NotificationRepository {
    async create(notification) {}
    async findByShopId(shopId, limit, offset) {}
    async markAsRead(notificationId) {}
    async getUnreadCount(shopId) {}
  }

  module.exports = NotificationRepository;