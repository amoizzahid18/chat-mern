import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../util/jwtToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password, confirmPassword, gender } =
      req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if ((await User.findOne({ email })) || (await User.findOne({ username }))) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      //   password: bcryptjs.hashSync(password, 10),
      password: hashedPassword,
      gender,
      profilePic:
        gender === "male"
          ? `https://avatar.iran.liara.run/public/boy?username=${username}`
          : `https://avatar.iran.liara.run/public/girl?username=${username}`,
    });
    if (newUser) {
    generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user?.password || "");
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    await res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: error.message });
  }
};


