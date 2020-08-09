const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
    createdBy: {
        type: String,
    },

    assignedTo: {
        type: String,
    },

    approved: {
        type: Boolean,
        default: false,
    },

    rejected: {
        type: Boolean,
        default: false,
    },

    pending: {
        type: Boolean,
        default: true,
    },

    message: {
        type: String,
    },

    department: {
        type: String
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("forms", formSchema);