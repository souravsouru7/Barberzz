const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  shopId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Shop', 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['BOOKING_CREATED', 'BOOKING_CANCELLED', 'PAYMENT_RECEIVED']
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  data: {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    serviceName: String,
    bookingDate: Date,
    bookingSlot: String,
    amount: Number
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

notificationSchema.index({ shopId: 1, createdAt: -1 });
notificationSchema.index({ shopId: 1, isRead: 1 });

const NotificationModel = mongoose.model('Notification', notificationSchema);
module.exports = NotificationModel;