const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        member: {
            type: Array
        }
    }
);

module.exports = ConversationSchema ;