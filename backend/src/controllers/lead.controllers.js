const leadModel = require("../models/lead.model");
const validator = require('validator');
const phoneRegex = /^[6-9]\d{9}$/;

// add new leads logic here...
exports.addLeads = async (req, res) => {
    try {
        const { name, phone, email, company, leadSource, status, notes } = req.body;
        if (!name || !phone || !leadSource) {
            return res.status(400).json({
                success: false,
                message: "name, phone and leadSource are required"
            })
        }
        if (name.length <= 3) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 3 characters"
            })
        }
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "This Email Id  is invalid"
            })
        }
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please Enter 10 digit valid number"
            })
        }

        const leads = await leadModel.create({ userid: req.user.id, name, phone, email, company, leadSource, status: status || "new", notes })
        return res.status(201).json({
            success: true,
            message: "new Leads add successfully",
            data: leads,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Issu"
        })
    }
}
// list leads logic here
exports.leads = async (req, res) => {
    try {
        const userId = req.user.id;
        const leads = await leadModel.find({ userid: userId }).sort({ createdAt: -1 });
        if (!leads) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: leads,
            message: "leads Fetch successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Issu"
        })
    }
}
// single by id  leads logic here...
exports.singleByIdLeads = async (req, res) => {
    try {
        const id = req.params.id
        const leads = await leadModel.findOne({ _id: id, userid: req.user.id })
        if (!leads) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "single by leads fetch successfully",
            data: leads,
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "Invalid lead id" });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Issu"
        })
    }
}
// Update Leads logic here
exports.updateLeads = async (req, res) => {
    try {
        const id = req.params.id
        const allowed = ["name", "phone", "email", "company", "leadSource", "status", "notes"];
        const updates = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined) updates[key] = req.body[key];
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "no fields to update"
            })
        }
        if (updates.email && !validator.isEmail(updates.email)) {
            return res.status(400).json({ success: false, message: "This Email Id is invalid" });
        }
        if (updates.phone && !phoneRegex.test(updates.phone)) {
            return res.status(400).json({ success: false, message: "Please Enter 10 digit valid number" });
        }
        const leads = await leadModel.findOneAndUpdate({ _id: id, userid: req.user.id }, updates, { new: true, runValidators: true })
        if (!leads) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "leads update successfully",
            data: leads,
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "Invalid lead id" });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Issu"
        })
    }
}
// Delete Leads logic here
exports.deleteLeads = async (req, res) => {
    try {
        const id = req.params.id
        const leads = await leadModel.findOneAndDelete({
            _id: id,
            userid: req.user.id
        })
        if (!leads) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "leads delete successfully",
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "Invalid lead id" });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Issu"
        })
    }
}
