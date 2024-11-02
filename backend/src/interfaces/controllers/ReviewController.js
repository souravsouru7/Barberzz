class ReviewController {
  constructor({ addReview, getShopReviews,updateReview, deleteReview }) {
    this.addReviewHandler = addReview;
    this.getReviewsHandler = getShopReviews;
    this.updateReviewHandler = updateReview;
    this.deleteReviewHandler = deleteReview;
  }

  async getReviews(req, res) {
    try {
      const { shopId } = req.params;
      const reviews = await this.getReviewsHandler.execute(shopId);
      
      const formattedReviews = reviews.map(review => ({
        _id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        likes: review.likes || 0,
        userName: review.user.name,
        userImage: review.user.profileImage,
        userId: review.user.id
      }));

      res.status(200).json({
        success: true,
        data: formattedReviews
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async addReview(req, res) {
    try {
      const { userId, shopId, rating, comment } = req.body;
      const reviewData = { userId, shopId, rating, comment };
      const savedReview = await this.addReviewHandler.execute(reviewData);

      const formattedReview = {
        _id: savedReview._id,
        rating: savedReview.rating,
        comment: savedReview.comment,
        createdAt: savedReview.createdAt,
        likes: 0,
        userName: savedReview.userId.name,
        userImage: savedReview.userId.profileImage,
        userId: savedReview.userId._id
      };

      res.status(201).json({
        success: true,
        data: formattedReview
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
  async updateReview(req, res) {
    try {
      const { reviewId } = req.params;
      const updatedData = req.body;

      const updatedReview = await this.updateReviewHandler.execute(reviewId, updatedData);
      res.status(200).json({
        success: true,
        data: updatedReview,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async deleteReview(req, res) {
    try {
      const { reviewId } = req.params;

      await this.deleteReviewHandler.execute(reviewId);
      res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = ReviewController;