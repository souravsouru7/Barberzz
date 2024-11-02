class GetShopReviews {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async execute(shopId) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }
    
    const reviews = await this.reviewRepository.getReviewsByShop(shopId);
    
    return reviews.map(review => ({
      id: review._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: {
        id: review.userId._id,
        name: review.userId.name,
        profileImage: review.userId.profileImage
      }
    }));
  }
}

module.exports = GetShopReviews;