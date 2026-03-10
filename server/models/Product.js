const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Laboratory Chemicals', 'Medical Chemicals', 'Laboratory Equipment', 'Medical Equipment']
    },
    description: { type: String, required: true },
    specifications: [{ type: String }],
    imageUrl: { type: String },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
