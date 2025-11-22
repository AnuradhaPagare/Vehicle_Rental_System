import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true, // ✅ Username should be unique
  },

  password: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user", // ✅ Assign default role
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
