import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users for home sidebar:", error);
    res.status(500).json({ message: error.message });
  }
};
export default getUsersForSidebar;
