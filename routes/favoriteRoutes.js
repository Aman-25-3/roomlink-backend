const express = require("express");

const {
  toggleFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add / Remove Favorite
router.post(
  "/favorites/:roomId",
  authMiddleware,
  toggleFavorite
);

// Get All Favorites
router.get(
  "/favorites",
  authMiddleware,
  getFavorites
);

module.exports = router;