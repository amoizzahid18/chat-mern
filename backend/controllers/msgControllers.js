import Message from "../models/msgModel.js";
import Convo from "../models/convoModel.js";

const sendMsg = async (req, res) => {
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

const getMsgs = async (req, res) => {
  try {
    const { id: toChatWithId } = req.params;
    const senderId  = req.user._id;

    let conversation = await Convo.findOne({
      participants: [senderId, toChatWithId],
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getting single convo messages:", error.message);
    res.status(500).json({ message: error.message });
  }
};
export { sendMsg, getMsgs };
