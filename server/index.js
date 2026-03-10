const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('FOLUXE API is running...');
});

// Import Routes
const productRoutes = require('./routes/productRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/quotes', quoteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
