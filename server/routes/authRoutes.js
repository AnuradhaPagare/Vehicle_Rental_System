import express from "express";
import { registerUser, loginUser, updateUser } from "../controllers/authController.js";

import User from "../models/User.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put("/user/:id", updateUser); // <-- new route

// GET LOGGED-IN USER INFO
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
