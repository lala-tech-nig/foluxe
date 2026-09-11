const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    organization: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
        default: 'Nigeria',
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    equipment: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },
    urgency: {
        type: String,
        enum: ['Immediate (Within 48h)', 'Urgent (1-2 Weeks)', 'Standard (Within a Month)', 'Budgeting & Planning'],
        default: 'Standard (Within a Month)',
    },
    budget: {
        type: String,
        default: 'Flexible / Standard Quote',
    },
    serviceType: {
        type: String,
        enum: ['Procurement Only', 'Procurement + Installation & Calibration', 'Turnkey Facility Solution'],
        default: 'Procurement + Installation & Calibration',
    },
    message: {
        type: String,
        trim: true,
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'in-review', 'quoted', 'completed', 'archived'],
        default: 'pending',
    },
    adminNotes: {
        type: String,
        default: '',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Quote', quoteSchema);
