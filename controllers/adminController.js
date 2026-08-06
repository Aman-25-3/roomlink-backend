const User = require("../models/User");
const Room = require("../models/Room");
const Review = require("../models/Review");
const Enquiry = require("../models/Enquiry");

// ==========================
// Dashboard
// ==========================

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalOwners = await User.countDocuments({
      role: "owner",
    });

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalRooms = await Room.countDocuments();

    const totalReviews = await Review.countDocuments();

    const totalEnquiries = await Enquiry.countDocuments();

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalOwners,
        totalStudents,
        totalRooms,
        totalReviews,
        totalEnquiries,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get All Users
// ==========================

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get All Rooms
// ==========================

const getAllRooms = async (req, res) => {
  try {

    const rooms = await Room.find()
      .populate("owner", "name email phone")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// Delete User
// ==========================

const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Delete Room
// ==========================

const deleteRoom = async (req, res) => {
  try {

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get All Reviews
// ==========================

const getAllReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("room", "title city")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Delete Review
// ==========================

const deleteReview = async (req, res) => {
  try {

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  getDashboard,
  getAllUsers,
  getAllRooms,
  getAllReviews,
  deleteReview,
  deleteUser,
  deleteRoom,
};