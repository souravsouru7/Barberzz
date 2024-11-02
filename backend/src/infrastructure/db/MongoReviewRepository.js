const ReviewRepository = require('../../domain/repositories/ReviewRepository');
const ReviewModel = require('../models/ReviewModel');

class MongoReviewRepository extends ReviewRepository {
  async addReview(reviewData) {
    const review = new ReviewModel(reviewData);
    await review.save();
    return await review.populate({
      path: 'userId',
      select: 'name profileImage'
    });
  }

  async getReviewsByShop(shopId) {
    return await ReviewModel.find({ shopId })
      .populate({
        path: 'userId',
        select: 'name profileImage'
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateReview(reviewId, updatedData) {
    return await ReviewModel.findByIdAndUpdate(reviewId, updatedData, { new: true })
      .populate({
        path: 'userId',
        select: 'name profileImage',
      })
      .exec();
  }

  async deleteReview(reviewId) {
    return await ReviewModel.findByIdAndDelete(reviewId).exec();
  }

}

module.exports = MongoReviewRepository;