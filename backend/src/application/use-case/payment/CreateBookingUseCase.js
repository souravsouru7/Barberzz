const Booking = require("../../../domain/entities/Booking"); // Make sure this path is correct

class CreateBookingUseCase {
  constructor(bookingRepository, notificationRepository) {
    this.bookingRepository = bookingRepository;
    this.notificationRepository = notificationRepository;
  }

  async execute(bookingData) {
    try {
      // Create booking
      const booking = new Booking(
        bookingData.userId,
        bookingData.shopId,
        bookingData.service,
        bookingData.bookingDate,
        bookingData.bookingSlot,
        bookingData.status
      );

      // Save booking
      const savedBooking = await this.bookingRepository.create(booking);

      // Create notification for shop
      const notification = {
        shopId: savedBooking.shopId,
        message: `New booking received for ${savedBooking.service.serviceName}`,
        type: 'BOOKING_CREATED',
        isRead: false,
        data: {
          bookingId: savedBooking._id,
          serviceName: savedBooking.service.serviceName,
          bookingDate: savedBooking.bookingDate,
          bookingSlot: savedBooking.bookingSlot,
          amount: savedBooking.service.price,
          customerName: bookingData.customerName,
          customerPhone: bookingData.customerPhone
        }
      };

      // Create notification asynchronously
      await this.notificationRepository.create(notification);

      return savedBooking;
    } catch (error) {
      console.error('Error in CreateBookingUseCase:', error);
      throw new Error('Failed to create booking and notification');
    }
  }
}

module.exports = CreateBookingUseCase;