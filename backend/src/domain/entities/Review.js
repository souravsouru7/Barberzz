class Review {
    constructor({ userId, shopId, rating, comment, createdAt }) {
      this.userId = userId;
      this.shopId = shopId;
      this.rating = rating;
      this.comment = comment;
      this.createdAt = createdAt || new Date();
    }
  }
  
  module.exports = Review;
  