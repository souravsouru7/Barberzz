// src/application/use-case/fetchAvailableSlots.js
class FetchAvailableSlotsUseCase {
  constructor(shopRepository, bookingRepository) {
    this.shopRepository = shopRepository;
    this.bookingRepository = bookingRepository;
  }

  isValidTimeFormat(timeString) {
    if (!timeString || typeof timeString !== 'string') return false;
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(timeString);
  }

  convertTimeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  isSlotOverlapping(slot1Start, slot1End, slot2Start, slot2End) {
    const start1 = this.convertTimeToMinutes(slot1Start);
    const end1 = this.convertTimeToMinutes(slot1End);
    const start2 = this.convertTimeToMinutes(slot2Start);
    const end2 = this.convertTimeToMinutes(slot2End);

    // Fix: Change overlap logic to be more precise
    return (start1 >= start2 && start1 < end2) || 
           (end1 > start2 && end1 <= end2) ||
           (start1 <= start2 && end1 >= end2);
  }

  async execute(shopId, date) {
    try {
      const shop = await this.shopRepository.findslotById(shopId);
      if (!shop) {
        throw new Error('Shop not found');
      }

      if (!shop.availableSlots || !Array.isArray(shop.availableSlots)) {
        throw new Error('No available slots found for this shop');
      }

      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      // Fix: Add proper error handling for booking retrieval
      const bookings = await this.bookingRepository.findByShopAndDateRange(
        shopId, 
        startOfDay, 
        endOfDay
      );

      if (!bookings) {
        console.warn('No bookings found for the specified date range');
        return shop.availableSlots;
      }

      // Fix: Improve booked slots processing
      const bookedSlots = bookings.reduce((acc, booking) => {
        if (booking && booking.bookingSlot) {
          const [startTime, endTime] = booking.bookingSlot.split('-');
          if (this.isValidTimeFormat(startTime) && this.isValidTimeFormat(endTime)) {
            acc.push({
              startTime,
              endTime,
              bookingId: booking.id
            });
          }
        }
        return acc;
      }, []);

      const currentTime = new Date();
      const currentHours = currentTime.getHours().toString().padStart(2, '0');
      const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
      const currentTimeString = `${currentHours}:${currentMinutes}`;

      // Fix: Improve slot filtering logic
      const availableSlots = shop.availableSlots.filter(slot => {
        // Validate slot format
        if (!slot || !this.isValidTimeFormat(slot.startTime) || !this.isValidTimeFormat(slot.endTime)) {
          console.warn(`Invalid slot format: ${JSON.stringify(slot)}`);
          return false;
        }

        // Check if the slot is already booked
        const isBooked = bookedSlots.some(bookedSlot => {
          return this.isSlotOverlapping(
            slot.startTime,
            slot.endTime,
            bookedSlot.startTime,
            bookedSlot.endTime
          );
        });

        // Check if the slot is in the future
        const isToday = new Date(date).setHours(0,0,0,0) === currentTime.setHours(0,0,0,0);
        const isFutureSlot = !isToday || 
          this.convertTimeToMinutes(slot.startTime) > this.convertTimeToMinutes(currentTimeString);

        return !isBooked && isFutureSlot;
      });


      return availableSlots.sort((a, b) => 
        this.convertTimeToMinutes(a.startTime) - this.convertTimeToMinutes(b.startTime)
      );

    } catch (error) {
      console.error('Error in FetchAvailableSlotsUseCase:', error);
      throw error;
    }
  }
}

module.exports = FetchAvailableSlotsUseCase;