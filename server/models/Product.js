const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    priceType: {
        type: String,
        enum: ['fixed', 'on-request'],
        default: 'fixed',
    },
    price: {
        type: Number,
        required: false, // Only required if priceType === 'fixed'
    },
    category: {
        type: String,
        required: true,
        enum: ['Laboratory Equipment', 'Medical Equipment', 'Chemicals & Reagents', 'Consumables'],
    },
    brand: {
        type: String,
        trim: true,
        default: '',
    },
    images: [{
        type: String, // Cloudinary URLs
    }],
    features: [{
        type: String,
    }],
    tags: [{
        type: String,
        trim: true,
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
