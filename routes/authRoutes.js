const express = require("express");
const router = express.Router();

const {
  register,
  login,
  uploadProfilePhoto,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadProfile");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Upload Profile Photo
router.put(
  "/upload-photo",
  authMiddleware,
  upload.single("photo"),
  uploadProfilePhoto
);

module.exports = router;