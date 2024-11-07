const mongoose = require('mongoose');
const BookingModel = require('../models/booking');
const PaymentModel = require('../models/payment');
const AnalyticsRepository = require("../../domain/repositories/analytics.repository");
class MongoDBAnalyticsRepository extends AnalyticsRepository {
    async getBookingStats(shopId, startDate, endDate) {
      // Fetch booking stats (total customers, bookings per day, etc.)
      const bookingStats = await BookingModel.aggregate([
        {
          $match: {
            shopId: new mongoose.Types.ObjectId(shopId),
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
              status: "$status"
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
        }
      ]);
      return bookingStats;
    }
  
    async getRevenueStats(shopId, startDate, endDate) {
      // Fetch revenue stats (total revenue)
      const revenueStats = await PaymentModel.aggregate([
        {
          $lookup: {
            from: 'bookings',
            localField: 'bookingId',
            foreignField: '_id',
            as: 'booking'
          }
        },
        {
          $unwind: '$booking'
        },
        {
          $match: {
            'booking.shopId': new mongoose.Types.ObjectId(shopId),
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            totalRevenue: { $sum: "$totalAmount" }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]);
      return revenueStats;
    }
  
    async getServicePopularityStats(shopId, startDate, endDate) {
      // Fetch service popularity stats (total bookings, average price, total revenue)
      const serviceStats = await BookingModel.aggregate([
        {
          $match: {
            shopId: new mongoose.Types.ObjectId(shopId),
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: "$service.serviceName",
            totalBookings: { $sum: 1 },
            averagePrice: { $avg: "$service.price" },
            totalRevenue: { $sum: "$service.price" }
          }
        },
        {
          $sort: { totalBookings: -1 }
        }
      ]);
      return serviceStats;
    }
  }
  
  module.exports = { MongoDBAnalyticsRepository };