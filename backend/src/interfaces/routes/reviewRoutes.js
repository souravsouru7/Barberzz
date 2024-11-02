const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const MongoReviewRepository = require('../../infrastructure/db/MongoReviewRepository');
const AddReview = require('../../application/use-case/Rivew/AddReview');
const GetShopReviews = require('../../application/use-case/Rivew/GetShopReviews');
const UpdateReview = require('../../application/use-case/Rivew/UpdateReview');
const DeleteReview = require('../../application/use-case/Rivew/DeleteReview');

const reviewRepository = new MongoReviewRepository();
const addReview = new AddReview(reviewRepository);
const getShopReviews = new GetShopReviews(reviewRepository);
const updateReview = new UpdateReview(reviewRepository);
const deleteReview = new DeleteReview(reviewRepository);
const reviewController = new ReviewController({ addReview, getShopReviews, updateReview, deleteReview });

router.post('/reviews', reviewController.addReview.bind(reviewController));
router.get('/shops/:shopId/reviews', reviewController.getReviews.bind(reviewController));
router.put('/reviews/:reviewId', reviewController.updateReview.bind(reviewController));
router.delete('/reviews/:reviewId', reviewController.deleteReview.bind(reviewController));

module.exports = router;
