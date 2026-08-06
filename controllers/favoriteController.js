const User = require("../models/User");

// Add / Remove Favorite
const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const roomId = req.params.roomId;

    const alreadyExists = user.favorites.includes(roomId);

    if (alreadyExists) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== roomId
      );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Room removed from favorites",
      });
    }

    user.favorites.push(roomId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Room added to favorites",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Favorite Rooms
const getFavorites = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("favorites");

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
};