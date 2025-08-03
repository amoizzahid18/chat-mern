import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

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
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
  }
};
export const login = (req, res) => {
  res.send("Login Route");
};
export const logout = (req, res) => {
  res.send("Logout Route");
};
