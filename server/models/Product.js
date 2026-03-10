const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false // Optional, some equipment might need quotes
    },
    category: {
        type: String,
        required: true,
        enum: ['Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables']
    },
    imageUrl: {
        type: String,
        required: false
    },
    features: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
