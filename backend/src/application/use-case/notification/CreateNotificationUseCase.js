const Notification = require("../../../domain/entities/Notification"); // Add this import

class CreateNotificationUseCase {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async execute(shopId, booking) {
    const notification = new Notification(
      shopId,
      'New booking received',
      'BOOKING_CREATED',
      false,
      {
        bookingId: booking._id,
        serviceName: booking.service.serviceName,
        bookingDate: booking.bookingDate,
        bookingSlot: booking.bookingSlot,
        amount: booking.service.price
      }
    );

    return await this.notificationRepository.create(notification);
  }
}

module.exports = CreateNotificationUseCase;