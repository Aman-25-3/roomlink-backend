const Room = require("../models/Room");

// ===============================
// Add Room
// ===============================
const addRoom = async (req, res) => {
  try {
    const imagePaths = req.files
      ? req.files.map((file) => file.filename)
      : [];

 const room = await Room.create({
  ...req.body,
  city: "Indore",
  owner: req.user.id,
  images: imagePaths,

  location: {
    lat: Number(req.body.lat),
    lng: Number(req.body.lng),
  },
});

    res.status(201).json({
      success: true,
      message: "Room Added Successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Rooms (Indore Only)
// ===============================
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      city: "Indore",
    }).populate(
    "owner",
    "name email phone photo createdAt"
)

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

// ===============================
// Get Owner Rooms
// ===============================
const getMyRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      owner: req.user.id,
    }).populate("owner", "name email");

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

// ===============================
// Get Single Room
// ===============================
const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "owner",
      "name email phone"
    );
    const totalRooms = await Room.countDocuments({
    owner: room.owner._id,
});

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

   res.status(200).json({
    success: true,
    room,
    totalRooms,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Room
// ===============================
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

    if (room.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own room.",
      });
    }

    // Prevent changing city
    req.body.city = "Indore";

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Room Updated Successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Room
// ===============================
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

    if (room.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own room.",
      });
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addRoom,
  getAllRooms,
  getMyRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};