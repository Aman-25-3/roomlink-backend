const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }
        const token = jwt.sign(
    {
        id: user._id,
        role: user.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d",
    }
);

    res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user,
});

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const register = async (req, res) => {
    try {
      const { name, email, phone, password, role } = req.body;

const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({
        success: false,
        message: "Email already registered",
    });
}
const hashedPassword = await bcrypt.hash(password, 10);
// Create new user
const user = new User({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
});

await user.save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

const uploadProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    user.photo = req.file.filename;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      photo: user.photo,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    login,
    register,
    uploadProfilePhoto,
};