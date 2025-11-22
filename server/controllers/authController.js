import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Make sure this file uses ES module export

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    console.log("📩 Incoming Request Body:", req.body);//remove after checking 
    const { name, username, password, mobile, address } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      mobile,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
