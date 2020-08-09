const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },

    message: {
        type: String,
    },

    status: {
        type: String,
        default: "Unread",
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("notification", notificationSchema);