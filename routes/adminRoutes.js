const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getAllUsers,
  getAllRooms,
  getAllReviews,
  deleteReview,
  deleteUser,
  deleteRoom,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboard
);

// Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.delete(
  "/user/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

// Rooms
router.get(
  "/rooms",
  authMiddleware,
  adminMiddleware,
  getAllRooms
);

router.delete(
  "/room/:id",
  authMiddleware,
  adminMiddleware,
  deleteRoom
);

router.get(
  "/reviews",
  authMiddleware,
  adminMiddleware,
  getAllReviews
);

router.delete(
  "/review/:id",
  authMiddleware,
  adminMiddleware,
  deleteReview
);
module.exports = router;