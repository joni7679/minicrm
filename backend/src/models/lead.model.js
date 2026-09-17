const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        company: {
            type: String,
            trim: true
        },

        leadSource: {
            type: String,
            enum: [
                "facebook",
                "google",
                "website",
                "whatsApp",
                "referral",
                "other"
            ],
            required: true
        },
        status: {
            type: String,
            enum: [
                "new",
                "contacted",
                "interested",
                "won",
                "converted",
                "lost"
            ],
            default: "new"
        },
        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);
const leadModel = mongoose.model("Lead", leadSchema);
module.exports = leadModel