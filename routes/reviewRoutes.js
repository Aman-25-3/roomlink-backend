const express = require("express");

const {
  addReview,
  getRoomReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Review
router.post("/reviews", authMiddleware, addReview);

// Get Reviews of One Room
router.get("/reviews/:roomId", getRoomReviews);

// Update Review
router.put("/reviews/:id", authMiddleware, updateReview);

// Delete Review
router.delete("/reviews/:id", authMiddleware, deleteReview);

module.exports = router;