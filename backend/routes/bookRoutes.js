const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  createBook
);
// router.post(
//   "/",
//   authMiddleware.isAuthenticated,
//   authMiddleware.isAdmin,
//   createBook
// );

module.exports = router;
