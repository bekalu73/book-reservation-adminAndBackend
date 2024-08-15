const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = {
  isAuthenticated: async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ error: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token is not valid" });
    }
  },

  isAdmin: async (req, res, next) => {
    const { role } = req.user; // Ensure req.user contains the role
    if (role !== "admin")
      return res.status(403).json({ error: "Access denied" });

    next();
  },
};

module.exports = authMiddleware;
