class UpdateReview {
    constructor(reviewRepository) {
      this.reviewRepository = reviewRepository;
    }
  
    async execute(reviewId, updatedData) {
      return await this.reviewRepository.updateReview(reviewId, updatedData);
    }
  }
  
  module.exports = UpdateReview;
  