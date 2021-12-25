const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        unseenMsg:{
            type: Number,
            default:0
        }
    }
);

module.exports = mongoose.model("Conversation",ConversationSchema);