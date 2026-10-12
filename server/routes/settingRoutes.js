const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const auth = require('../middleware/auth');

const DEFAULT_MARQUEE = {
    enabled: true,
    backgroundColor: '#0056b3', // Foluxe brand color
    textColor: '#ffffff',
    speed: 'normal', // 'slow' | 'normal' | 'fast'
    pauseOnHover: true,
    messages: [
        {
            id: '1',
            badge: 'EXCLUSIVE PARTNERSHIP',
            text: 'Foluxe Global signs Exclusive Country Partnership with Charge Life Science LLP (Biomal AI) — direct access to 1,000+ verified global medical & lab suppliers worldwide.',
            link: '/partners',
            isExternal: false
        },
        {
            id: '2',
            badge: 'INDUSTRY ANNOUNCEMENT',
            text: 'Foluxe Global is expanding: We offer our platform to medical & laboratory equipment players, distributors, and agents to promote and market their products and services across Nigeria & West Africa.',
            link: '/partners',
            isExternal: false
        },
        {
            id: '3',
            badge: 'GLOBAL PORTAL',
            text: 'Direct global search is now available! Query international laboratory equipment, reagents, and chemicals directly at Biomal.ai.',
            link: 'https://Biomal.ai',
            isExternal: true
        }
    ]
};

// @route   GET /api/settings/marquee
// @desc    Get top marquee banner settings (Public)
// @access  Public
router.get('/marquee', async (req, res) => {
    try {
        let setting = await Setting.findOne({ key: 'top_marquee' });
        if (!setting) {
            return res.json(DEFAULT_MARQUEE);
        }
        res.json(setting.value);
    } catch (err) {
        console.error('Error fetching marquee settings:', err.message);
        res.status(500).json(DEFAULT_MARQUEE);
    }
});

// @route   PUT /api/settings/marquee
// @desc    Update top marquee banner settings
// @access  Private (Admin)
router.put('/marquee', auth, async (req, res) => {
    try {
        const { enabled, backgroundColor, textColor, speed, pauseOnHover, messages } = req.body;

        const value = {
            enabled: enabled !== undefined ? Boolean(enabled) : true,
            backgroundColor: backgroundColor || '#0056b3',
            textColor: textColor || '#ffffff',
            speed: speed || 'normal',
            pauseOnHover: pauseOnHover !== undefined ? Boolean(pauseOnHover) : true,
            messages: Array.isArray(messages) && messages.length > 0 ? messages : DEFAULT_MARQUEE.messages
        };

        const setting = await Setting.findOneAndUpdate(
            { key: 'top_marquee' },
            { key: 'top_marquee', value, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        res.json(setting.value);
    } catch (err) {
        console.error('Error saving marquee settings:', err.message);
        res.status(500).json({ msg: 'Server error saving marquee settings' });
    }
});

module.exports = router;
