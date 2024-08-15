const Reservation = require("../models/reservation");

// Get All Reservations (Admin Only)
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("userId")
      .populate("bookId");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Reservation Status (Admin Only)
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!reservation)
      return res.status(404).json({ error: "Reservation not found" });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
