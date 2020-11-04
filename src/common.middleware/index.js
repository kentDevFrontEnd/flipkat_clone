const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

module.exports.requiresignin = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Authorization is required" });
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  console.log(user.role);
  req.user = user;

  next();
};

module.exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user")
    return res.status(200).json({ message: "User access denied" });

  next();
};

module.exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(200).json({ message: "Admin access denied" });

  next();
};
