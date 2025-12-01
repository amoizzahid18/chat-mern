import User from "../models/userModel.js";

export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId});
    if(!user) {
      return res.status(404).json("User not found with id ", userId);
    }
    res.status(200).json(user.friends)
  } catch (error) {
    console.error("Error Fetching Friends for side bar",error);
    res.status(500).json({ message: error.message });
  }
}
export const getAllUsersForFriendReq = async (req, res) => {
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


export const addFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(400).json({ message: "You are not a user" });
    }
    if (sender.friends.includes(id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    sender.friends.push(id);
    await sender.save();
    return res.status(201).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error while adding friend", error);
    return res.status(500).json({ message: error.message });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const sender = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!sender) {
      return res.status(400).json({ message: "You are not a user" });
    }
    if (!sender.friends.includes(id)) {
      return res.status(400).json({ message: "User is not a friend" });
    }
    sender.friends = sender.friends.filter((friend) => friend !== id);
    await sender.save();
    return res.status(201).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error removing friend", error);
    return res.status(500).json({ message: error.message });
  }
};


export default {getFriends, getAllUsersForFriendReq, deleteAccount, removeFriend, addFriend};
