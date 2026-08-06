const logger = (req, res, next) => {
    console.log("========== New Request ==========");
    console.log("Method :", req.method);
    console.log("URL    :", req.url);

    next();
};

module.exports = logger;