import Message from "../models/msgModel.js"

export const sendMsg = async (req, res) => {
    try {
        const { id } = req.params; // receiverId
        const { message } = req.body;
        const senderId = req.userId
        
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: error.message });
    }
}