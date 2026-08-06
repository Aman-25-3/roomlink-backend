const express = require("express");

const {
  sendEnquiry,
  getOwnerEnquiries,
  getMyEnquiries,
  replyEnquiry,
} = require("../controllers/enquiryController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Student sends enquiry
router.post("/enquiry", authMiddleware, sendEnquiry);

// Owner sees all enquiries
router.get("/owner-enquiries", authMiddleware, getOwnerEnquiries);

// Student sees his enquiries
router.get("/my-enquiries", authMiddleware, getMyEnquiries);

// Owner replies to enquiry
router.put("/enquiry/:id/reply", authMiddleware, replyEnquiry);

module.exports = router;