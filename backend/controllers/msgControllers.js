import Message from "../models/msgModel.js";
import Convo from "../models/convoModel.js";

// Send a message (1:1 or group)
const sendMsg = async (req, res) => {
  try {
    const { convoId, message, isForwarded, isAReply, replyTo } = req.body;
    const senderId = req.user._id;

    let conversation;
    if (convoId) {
      // Group or 1:1 convo already exists
      conversation = await Convo.findById(convoId);
      if (!conversation) return res.status(404).json({ message: "Conversation not found" });
    } else {
      // 1:1 convo: find or create
      const { receiverId } = req.params;
      conversation = await Convo.findOne({
        participants: { $all: [senderId, receiverId] },
        isGroup: false,
      });
      if (!conversation) {
        conversation = await Convo.create({
          participants: [senderId, receiverId],
          isGroup: false,
        });
      }
    }

    const newMessage = await Message.create({
      senderId,
      message,
      isAReply,
      replyTo,
      isForwarded,
    });

    conversation.messages.push(newMessage._id);
    await newMessage.save();
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all messages for a conversation
const getMsgs = async (req, res) => {
  try {
    const { convoId } = req.params;
    const conversation = await Convo.findById(convoId).populate("messages");

    if (!conversation || conversation.isDeleted) return res.status(200).json([]);
    
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete a single message (soft delete)
const delMsg = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const msg = await Message.findById(messageId);

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

// Edit a single message
const editMsg = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const msg = await Message.findById(messageId);

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

// Delete a conversation (soft delete)
const delConvo = async (req, res) => {
  try {
    const { id: convoId } = req.params;
    const convo = await Convo.findById(convoId);

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
