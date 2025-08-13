import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isDeleted:{
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    isForwarded:{
      type: Boolean,
      default:false
    },
    isAReply:{
      type: Boolean, 
      default: false
    },
    replyTo:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null
    }
  },
  { timestamps: true }
);


const Message = mongoose.model("Message", msgSchema);
export default Message;