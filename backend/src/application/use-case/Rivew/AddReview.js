class AddReview {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async execute(reviewData) {
    if (!reviewData.userId || !reviewData.shopId || !reviewData.rating) {
      throw new Error('Missing required review data');
    }
    
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    
    const review = await this.reviewRepository.addReview(reviewData);
    return review;
  }
}

module.exports = AddReview;