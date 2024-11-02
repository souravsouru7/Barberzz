// application/use-cases/notification/MarkNotificationAsReadUseCase.js

class MarkNotificationAsReadUseCase {
    constructor(notificationRepository) {
      this.notificationRepository = notificationRepository;
    }
  
    /**
     * Mark a notification as read
     * @param {string} notificationId - The ID of the notification to mark as read
     * @returns {Promise<Object>} The updated notification
     * @throws {Error} If notification ID is invalid or notification not found
     */
    async execute(notificationId) {
      // Input validation
      if (!notificationId) {
        throw new Error('Notification ID is required');
      }
  
      try {
        // Check if the notification exists and update it
        const updatedNotification = await this.notificationRepository.markAsRead(notificationId);
  
        // If no notification was found with the given ID
        if (!updatedNotification) {
          throw new Error(`Notification with ID ${notificationId} not found`);
        }
  
        return {
          success: true,
          notification: updatedNotification,
          message: 'Notification marked as read successfully',
          timestamp: new Date()
        };
  
      } catch (error) {
        // Log the error for internal tracking
        console.error('Error in MarkNotificationAsReadUseCase:', error);
  
        // Determine if it's a known error or an unexpected one
        if (error.message.includes('not found')) {
          throw new Error(`Notification not found: ${notificationId}`);
        }
  
        // Handle invalid MongoDB ID format
        if (error.name === 'CastError') {
          throw new Error('Invalid notification ID format');
        }
  
        // For any other unexpected errors
        throw new Error(`Failed to mark notification as read: ${error.message}`);
      }
    }
  
    /**
     * Mark multiple notifications as read
     * @param {string[]} notificationIds - Array of notification IDs to mark as read
     * @returns {Promise<Object>} Summary of the operation
     */
    async executeMany(notificationIds) {
      if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
        throw new Error('Valid array of notification IDs is required');
      }
  
      try {
        const updatePromises = notificationIds.map(id => 
          this.notificationRepository.markAsRead(id)
        );
  
        const results = await Promise.allSettled(updatePromises);
  
        // Count successful and failed operations
        const summary = results.reduce((acc, result) => {
          if (result.status === 'fulfilled' && result.value) {
            acc.successful.push(result.value._id);
          } else {
            acc.failed.push({
              id: notificationIds[results.indexOf(result)],
              reason: result.reason?.message || 'Unknown error'
            });
          }
          return acc;
        }, { successful: [], failed: [] });
  
        return {
          success: true,
          message: 'Batch update completed',
          summary: {
            total: notificationIds.length,
            successfulCount: summary.successful.length,
            failedCount: summary.failed.length,
            successfulIds: summary.successful,
            failedOperations: summary.failed
          },
          timestamp: new Date()
        };
  
      } catch (error) {
        console.error('Error in MarkNotificationAsReadUseCase batch operation:', error);
        throw new Error(`Failed to mark notifications as read: ${error.message}`);
      }
    }
  
    /**
     * Mark all notifications for a shop as read
     * @param {string} shopId - The ID of the shop
     * @returns {Promise<Object>} Summary of the operation
     */
    async executeForShop(shopId) {
      if (!shopId) {
        throw new Error('Shop ID is required');
      }
  
      try {
        // Get all unread notifications for the shop
        const unreadNotifications = await this.notificationRepository
          .findByShopId(shopId, { isRead: false });
  
        if (unreadNotifications.length === 0) {
          return {
            success: true,
            message: 'No unread notifications found',
            count: 0
          };
        }
  
        // Mark all notifications as read
        const notificationIds = unreadNotifications.map(notification => 
          notification._id.toString()
        );
  
        return await this.executeMany(notificationIds);
  
      } catch (error) {
        console.error('Error in MarkNotificationAsReadUseCase shop operation:', error);
        throw new Error(`Failed to mark shop notifications as read: ${error.message}`);
      }
    }
  }
  
  module.exports = MarkNotificationAsReadUseCase;