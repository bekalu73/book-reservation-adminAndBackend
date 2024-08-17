const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");

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

// get all users
exports.getUsers = async (req, res) => {
  try {
    const Allusers = await User.find();
    const AllBooks = await Book.find();
    if (Allusers.length === 0 || AllBooks.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.json({ users: Allusers.length, books: AllBooks.length });
  } catch (error) {
    console.error(error); // Optional: log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

// add a controller to edit a user data
exports.userEdit = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is provided in the route params
    const { name, email, password } = req.body; // Extracting the new data from the request body

    // Validate the inputs here (optional but recommended)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's data
    user.name = name;
    user.email = email;

    // Hash the password before saving
    const saltRounds = 10; // You can adjust the salt rounds as needed
    user.password = await bcrypt.hash(password, saltRounds);

    // Save the updated user data to the database
    await user.save();

    // Respond with the updated user data (excluding the password for security reasons)
    res.status(200).json({
      message: "User updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
