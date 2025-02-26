const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Token is missing." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Access Forbidden!" });
    }

    // เก็บข้อมูลจาก JWT payload ไว้ใน request object
    req.role = decoded.role;
    req.email = decoded.email;
    next();
  });
};

isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "require Admin role" });
  }
  next();
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
