const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const auth = require('../middleware/auth');

// Helper to generate a unique readable reference code like FLX-RFQ-7482
function generateReferenceId() {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `FLX-RFQ-${randomDigits}`;
}

// @route   POST /api/quotes
// @desc    Submit a new request for quote (Public)
// @access  Public
router.post('/', async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            organization,
            location,
            category,
            equipment,
            quantity,
            urgency,
            budget,
            serviceType,
            message
        } = req.body;

        if (!fullName || !email || !phone || !organization || !category || !equipment) {
            return res.status(400).json({ 
                msg: 'Please fill in all required fields: Full Name, Email, Phone, Organization, Category, and Equipment requested.' 
            });
        }

        let referenceId = generateReferenceId();
        // Ensure uniqueness
        let exists = await Quote.findOne({ referenceId });
        while (exists) {
            referenceId = generateReferenceId();
            exists = await Quote.findOne({ referenceId });
        }

        const newQuote = new Quote({
            referenceId,
            fullName,
            email,
            phone,
            organization,
            location: location || 'Nigeria',
            category,
            equipment,
            quantity: Number(quantity) || 1,
            urgency: urgency || 'Standard (Within a Month)',
            budget: budget || 'Flexible / Standard Quote',
            serviceType: serviceType || 'Procurement + Installation & Calibration',
            message: message || '',
            status: 'pending'
        });

        const savedQuote = await newQuote.save();

        res.status(201).json({
            success: true,
            msg: 'Quote request submitted successfully',
            quote: savedQuote,
            referenceId: savedQuote.referenceId
        });
    } catch (err) {
        console.error('Error creating quote request:', err);
        res.status(500).json({ msg: 'Server error processing quote submission' });
    }
});

// @route   GET /api/quotes/stats
// @desc    Get summary statistics of quote requests
// @access  Private (Admin)
router.get('/stats', auth, async (req, res) => {
    try {
        const [total, pending, inReview, quoted, completed] = await Promise.all([
            Quote.countDocuments(),
            Quote.countDocuments({ status: 'pending' }),
            Quote.countDocuments({ status: 'in-review' }),
            Quote.countDocuments({ status: 'quoted' }),
            Quote.countDocuments({ status: 'completed' })
        ]);

        res.json({
            total,
            pending,
            inReview,
            quoted,
            completed
        });
    } catch (err) {
        console.error('Error fetching quote stats:', err);
        res.status(500).json({ msg: 'Failed to retrieve quote statistics' });
    }
});

// @route   GET /api/quotes
// @desc    Get all quote requests with optional filter and search
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
    try {
        const { status, search, limit } = req.query;
        const query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { referenceId: { $regex: search, $options: 'i' } },
                { fullName: { $regex: search, $options: 'i' } },
                { organization: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { equipment: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
            ];
        }

        let queryChain = Quote.find(query).sort({ createdAt: -1 });

        if (limit) {
            queryChain = queryChain.limit(parseInt(limit, 10));
        }

        const quotes = await queryChain;
        res.json(quotes);
    } catch (err) {
        console.error('Error fetching quotes:', err);
        res.status(500).json({ msg: 'Failed to retrieve quotes' });
    }
});

// @route   GET /api/quotes/:id
// @desc    Get a single quote request by ID
// @access  Private (Admin)
router.get('/:id', auth, async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ msg: 'Quote request not found' });
        }
        res.json(quote);
    } catch (err) {
        console.error('Error fetching quote details:', err);
        res.status(500).json({ msg: 'Failed to retrieve quote details' });
    }
});

// @route   PATCH /api/quotes/:id/status
// @desc    Update quote status and admin notes
// @access  Private (Admin)
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const updateFields = {};

        if (status) updateFields.status = status;
        if (typeof adminNotes === 'string') updateFields.adminNotes = adminNotes;

        const updatedQuote = await Quote.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedQuote) {
            return res.status(404).json({ msg: 'Quote request not found' });
        }

        res.json({
            success: true,
            msg: 'Quote updated successfully',
            quote: updatedQuote
        });
    } catch (err) {
        console.error('Error updating quote status:', err);
        res.status(500).json({ msg: 'Failed to update quote' });
    }
});

// @route   DELETE /api/quotes/:id
// @desc    Delete a quote request
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id);
        if (!quote) {
            return res.status(404).json({ msg: 'Quote request not found' });
        }
        res.json({ success: true, msg: 'Quote request removed successfully' });
    } catch (err) {
        console.error('Error deleting quote:', err);
        res.status(500).json({ msg: 'Failed to delete quote request' });
    }
});

module.exports = router;
