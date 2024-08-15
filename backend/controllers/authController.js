const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  const { name, phone, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get All Pending Users
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ isApproved: false });
    res.json(users); // Return the array of users
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error message
  }
};

// Approve User
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isApproved = true;
    await user.save();
    res.json({ message: "User approved successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject User
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User rejected and deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
