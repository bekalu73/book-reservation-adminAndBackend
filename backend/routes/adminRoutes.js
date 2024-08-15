const express = require("express");
const router = express.Router();
const {
  getReservations,
  updateReservation,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/reservations", authMiddleware.isAdmin, getReservations);
router.put("/reservations/:id", authMiddleware.isAdmin, updateReservation);

module.exports = router;
