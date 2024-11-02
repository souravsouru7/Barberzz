class DeleteReview {
    constructor(reviewRepository) {
      this.reviewRepository = reviewRepository;
    }
  
    async execute(reviewId) {
      return await this.reviewRepository.deleteReview(reviewId);
    }
  }
  
  module.exports = DeleteReview;
  