import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPassword: { type: String, required: true },

  userType: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

export default User;