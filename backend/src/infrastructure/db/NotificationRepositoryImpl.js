const NotificationModel=require("../models/Notification")
const NotificationRepository=require("../../domain/repositories/NotificationRepository")
class NotificationRepositoryImpl extends NotificationRepository {
  async create(notification) {
    try {
      const notificationModel = new NotificationModel(notification);
      return await notificationModel.save();
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new Error('Failed to create notification');
    }
  }

  async findByShopId(shopId, options = {}) {
    const { limit = 10, offset = 0, type } = options;
    const query = { shopId };
    
    if (type) {
      query.type = type;
    }

    try {
      return await NotificationModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .lean();
    } catch (error) {
      console.error('Error finding notifications:', error);
      throw new Error('Failed to fetch notifications');
    }
  }

  async markAsRead(notificationId) {
    try {
      return await NotificationModel.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Failed to mark notification as read');
    }
  }

  async getUnreadCount(shopId) {
    try {
      return await NotificationModel.countDocuments({
        shopId,
        isRead: false
      });
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw new Error('Failed to get unread notification count');
    }
  }
}

module.exports = NotificationRepositoryImpl;