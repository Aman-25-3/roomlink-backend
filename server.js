const notificationRoutes = require("./routes/notificationRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cors = require("cors");
require("dotenv").config();

const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");

const logger = require("./middleware/logger");
const authMiddleware = require("./middleware/authMiddleware");
const ownerMiddleware = require("./middleware/ownerMiddleware");

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(logger);

// Routes
app.use(authRoutes);
app.use(favoriteRoutes);
app.use(roomRoutes);
app.use(enquiryRoutes);
app.use(notificationRoutes);
app.use(reviewRoutes);
app.use("/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

// Home Route
app.get("/", (req, res) => {
    res.send("Room Link Backend Running 🚀");
});

// About Route
app.get("/about", (req, res) => {
    res.send("This is Room Link Backend API");
});

// Contact Route
app.get("/contact", (req, res) => {
    res.send("Contact API Working");
});

// Hello Route
app.get("/hello", (req, res) => {
    res.send("My name is Aman");
});

// Protected Profile Route
app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to your profile",
        user: req.user,
    });
});

// Owner Dashboard Route
app.get(
    "/owner-dashboard",
    authMiddleware,
    ownerMiddleware,
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Owner Dashboard",
        });
    }
);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});