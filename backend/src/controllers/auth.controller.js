import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    // generate token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET || "mocksecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
