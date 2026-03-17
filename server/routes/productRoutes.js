const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/products
// @desc    Get all products (with optional search/filter query params)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, category, brand, priceType, sort } = req.query;

        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }
        if (brand && brand !== 'All') {
            query.brand = new RegExp(brand, 'i');
        }
        if (priceType && priceType !== 'All') {
            query.priceType = priceType;
        }
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { brand: new RegExp(search, 'i') },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        else if (sort === 'price_desc') sortOption = { price: -1 };
        else if (sort === 'newest') sortOption = { createdAt: -1 };

        const products = await Product.find(query).sort(sortOption);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/products/meta
// @desc    Get unique brands and categories for filter dropdowns
// @access  Public
router.get('/meta', async (req, res) => {
    try {
        const brands = await Product.distinct('brand');
        const categories = await Product.distinct('category');
        res.json({ brands: brands.filter(Boolean), categories });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Product not found' });
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/products
// @desc    Create a product (with up to 5 image uploads)
// @access  Private (Admin)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, priceType, price, category, brand, features, tags } = req.body;

        // Collect uploaded image URLs from Cloudinary
        const images = req.files ? req.files.map(f => f.path) : [];

        const newProduct = new Product({
            title,
            description,
            priceType: priceType || 'fixed',
            price: priceType === 'on-request' ? undefined : Number(price),
            category,
            brand: brand || '',
            images,
            features: features ? (Array.isArray(features) ? features : features.split('\n').filter(Boolean)) : [],
            tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean)) : [],
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Admin)
router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        const { title, description, priceType, price, category, brand, features, tags, existingImages } = req.body;

        // Merge existing images not removed with newly uploaded ones
        const newImages = req.files ? req.files.map(f => f.path) : [];
        const kept = existingImages ? (Array.isArray(existingImages) ? existingImages : [existingImages]) : [];
        const images = [...kept, ...newImages].slice(0, 5);

        product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title,
                    description,
                    priceType: priceType || 'fixed',
                    price: priceType === 'on-request' ? undefined : Number(price),
                    category,
                    brand: brand || '',
                    images,
                    features: features ? (Array.isArray(features) ? features : features.split('\n').filter(Boolean)) : [],
                    tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean)) : [],
                }
            },
            { new: true }
        );
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        await product.deleteOne();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Product not found' });
        res.status(500).send('Server Error');
    }
});

module.exports = router;
