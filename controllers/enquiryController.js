const Enquiry = require("../models/Enquiry");
const Notification = require("../models/Notification");
const Room = require("../models/Room");

// Student sends enquiry
const sendEnquiry = async (req, res) => {
  try {
  
    const { roomId, message } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

    const enquiry = await Enquiry.create({
      room: room._id,
      student: req.user.id,
      owner: room.owner,
      message,
    });

    await Notification.create({
  receiver: room.owner,
  sender: req.user.id,
  title: "New Enquiry",
  message: `${req.user.name} sent an enquiry for ${room.title}`,
  type: "Enquiry",
});


await Notification.create({
  receiver: enquiry.student,
  sender: req.user.id,
  title: "Reply Received",
  message: `Owner replied to your enquiry for ${room.title}`,
  type: "Reply",
});

    res.status(201).json({
      success: true,
      message: "Enquiry Sent Successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Owner sees all enquiries
const getOwnerEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      owner: req.user.id,
    })
      .populate("room", "title city")
      .populate("student", "name email");

    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Student sees his enquiries
const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      student: req.user.id,
    })
      .populate("room", "title city")
      .populate("owner", "name email");

    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Owner replies to enquiry
const replyEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry Not Found",
      });
    }

    enquiry.reply = reply;
    enquiry.status = "Replied";

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: "Reply Sent Successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendEnquiry,
  getOwnerEnquiries,
  getMyEnquiries,
  replyEnquiry,
};