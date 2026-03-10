const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/QuoteRequest');

// Submit a quote request
router.post('/', async (req, res) => {
    const quote = new QuoteRequest(req.body);
    try {
        const newQuote = await quote.save();
        res.status(201).json({ success: true, data: newQuote });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all quote requests (for admin)
router.get('/', async (req, res) => {
    try {
        const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
