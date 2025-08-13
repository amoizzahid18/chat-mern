import Message from "../models/msgModel.js";
import Convo from "../models/convoModel.js";

const sendMsg = async (req, res) => {
  try {
    const { id: receiverId } = req.params; // receiverId
    const { message, isForwarded, isAReply, replyTo } = req.body;
    const senderId = req.user._id;

    let conversation = await Convo.findOne({
      participants: [senderId, receiverId],
    });

    if (!conversation) {
      conversation = await Convo.create({
        participants: [senderId, receiverId],
      });
    }
    let newMessage;
    if (isAReply && replyTo) {
      newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        isAReply,
        replyTo,
      });
    } else if (isForwarded) {
      newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        isForwarded,
      });
    } else {
      newMessage = await Message.create({
        senderId,
        receiverId,
        message
      });
    }
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
    const senderId = req.user._id;

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

const delMsg = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    let msg = await Message.findById(messageId);
    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }
    msg.isDeleted = true;
    msg.message = "This message has been deleted";
    await msg.save();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: error.message });
  }
};

const editMsg = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    let msg = await Message.findById(messageId);
    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }
    if (msg.isDeleted) {
      return res.status(400).json({ message: "Cannot edit a deleted message" });
    }
    const { message } = req.body;
    msg.message = message;
    msg.isEdited = true;
    await msg.save();
    res.status(200).json({ message: "Message edited successfully", msg });
  } catch (error) {
    console.error("Error editing message:", error);
    res.status(500).json({ message: error.message });
  }
};

const delConvo = async (req, res) => {
  try {
    const { id: convoId } = req.params;
    let convo = await Convo.findById(convoId);
    if (!convo) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    convo.isDeleted = true;
    await convo.save();
    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ message: error.message });
  }
};
export { sendMsg, getMsgs, delMsg, editMsg, delConvo };
