import Message from "../models/msgModel.js";
import Convo from "../models/convoModel.js";

export const sendMsg = async (req, res) => {
  try {
    const { id: receiverId } = req.params; // receiverId
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Convo.findOne({
      participants: [senderId, receiverId],
    });

    if (!conversation) {
      conversation = await Convo.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage);
    }
    // await Promise.all([conversation.save(), newMessage.save()]); // run both saves in parallel
    await newMessage.save();
    await conversation.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: error.message });
  }
};
