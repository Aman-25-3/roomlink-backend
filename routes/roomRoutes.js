const express = require("express");

const {
    addRoom,
    getAllRooms,
    getMyRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
} = require("../controllers/roomController");

const authMiddleware = require("../middleware/authMiddleware");
const ownerMiddleware = require("../middleware/ownerMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// =======================
// Add Room (Owner Only)
// =======================
router.post(
    "/rooms",
    authMiddleware,
    ownerMiddleware,
    upload.array("images", 5),
    addRoom
);

// =======================
// Get All Rooms (Public)
// =======================
router.get("/rooms", getAllRooms);

// =======================
// Get Logged-in Owner Rooms
// =======================
router.get(
    "/my-rooms",
    authMiddleware,
    ownerMiddleware,
    getMyRooms
);

// =======================
// Get Single Room
// =======================
router.get("/rooms/:id", getSingleRoom);

// =======================
// Update Room
// =======================
router.put(
    "/rooms/:id",
    authMiddleware,
    ownerMiddleware,
    updateRoom
);

// =======================
// Delete Room
// =======================
router.delete(
    "/rooms/:id",
    authMiddleware,
    ownerMiddleware,
    deleteRoom
);

module.exports = router;