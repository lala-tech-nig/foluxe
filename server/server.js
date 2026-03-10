const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
// TODO: Replace with actual MongoDB URI or set it in .env
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foluxe';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error('Database connection error:', err);
        // Do not exit process in dev, just log it so client can still hit non-DB routes if needed.
    });

// Define Routes
app.use('/api/products', require('./routes/productRoutes'));

// Basic route
app.get('/', (req, res) => res.send('Foluxe API is running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
