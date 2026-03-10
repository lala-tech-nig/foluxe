const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organization: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    equipmentNeeded: { type: String },
    chemicalNeeded: { type: String },
    message: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Fulfilled', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
