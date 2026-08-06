const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/notifications", authMiddleware, getNotifications);

router.put(
  "/notifications/:id/read",
  authMiddleware,
  markAsRead
);

router.put(
  "/notifications/read-all",
  authMiddleware,
  markAllRead
);

router.delete(
  "/notifications/:id",
  authMiddleware,
  deleteNotification
);

module.exports = router;