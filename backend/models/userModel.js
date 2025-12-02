import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    },
    minlength: 6,
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
  profilePic: {
    type: String,
    default: function () {
      return this.gender === "Male"
        ? `https://avatar.iran.liara.run/public/boy?username=${this.username}`
        : `https://avatar.iran.liara.run/public/girl?username=${this.username}`;
    },
  },
  bio: {
    type: String,
    default: "",
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
