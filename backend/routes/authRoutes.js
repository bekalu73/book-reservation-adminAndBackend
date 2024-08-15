const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getPendingUsers,
  approveUser,
  rejectUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get(
  "/pending",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  getPendingUsers
);

router.put(
  "/approve/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  approveUser
);

router.delete(
  "/reject/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  rejectUser
);

module.exports = router;

//http://localhost:8800/auth/login
