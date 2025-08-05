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
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found or incorrect id" });
    }
    res.clearCookie("token");
    res.status(200).json({ message: "Account deleted successfully" });

  } catch (error) {
    console.error("Error during account deletion:", error);
    res.status(500).json({ message: error.message });
  }
};

export default getUsersForSidebar;
