import Message from "../models/msgModel.js";
import Convo from "../models/convoModel.js";

// Send a message (1:1 or group)
const sendMsg = async (req, res) => {
  try {
    const { message, isForwarded, isAReply, replyTo } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;
    let conversation;
    if (id) {
      // Group or 1:1 convo already exists
      conversation = await Convo.findById(id);
      // 1:1 convo: find or create
      if (!conversation) {
        conversation = await Convo.findOne({
          participants: { $all: [senderId, id].sort() },
        });
        if (!conversation) {
          conversation = await Convo.create({
            participants: [senderId, id].sort(),
            isGroup: false,
          });
        }
      }
    }

    const newMessage = await Message.create({
      senderId: senderId,
      receiverId: id,
      message: message,
      isAReply: isAReply,
      replyTo: replyTo,
      isForwarded: isForwarded,
    });

    conversation.messages.push(newMessage._id);
    await newMessage.save();
    await conversation.save();

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all messages for a conversation
const getMsgs = async (req, res) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;
    const conversation = await Convo.findById(id).populate("messages");

    if (!conversation) {
      const dm = await Convo.findOne({
        participants: { $all: [senderId, id].sort() },
      }).populate("messages");
      if (!dm) {
        return res.status(200).json([]);
      } else {
        return res.status(200).json(dm.messages);
      }
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a single message (soft delete)
const delMsg = async (req, res) => {
  try {
    const { id: id } = req.params;
    const msg = await Message.findById(id);

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
    const { id } = req.params;
    const msg = await Message.findById(id);

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
