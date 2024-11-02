class GetShopNotificationsUseCase {
    constructor(notificationRepository) {
      this.notificationRepository = notificationRepository;
    }
  
    async execute(shopId, limit, offset) {
      return await this.notificationRepository.findByShopId(shopId, limit, offset);
    }
  }
  
  // application/use-case/notification/MarkNotificationAsReadUseCase.js
  class MarkNotificationAsReadUseCase {
    constructor(notificationRepository) {
      this.notificationRepository = notificationRepository;
    }
  
    async execute(notificationId) {
      return await this.notificationRepository.markAsRead(notificationId);
    }
  }

module.exports =GetShopNotificationsUseCase