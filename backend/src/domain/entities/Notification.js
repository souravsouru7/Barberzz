class Notification {
    constructor(shopId, message, type, isRead, data) {
      this.shopId = shopId;
      this.message = message;
      this.type = type;
      this.isRead = isRead;
      this.data = data;
      this.createdAt = new Date();
    }
  }

  module.exports = Notification;