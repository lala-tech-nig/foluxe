/**
 * Foluxe Admin Seed Script
 * Run: node seed.js
 * Seeds the admin account from your .env credentials into MongoDB.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foluxe';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌  ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.');
    process.exit(1);
}

async function seed() {
    console.log('🔌  Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅  Connected.');

    const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });

    if (existing) {
        console.log(`ℹ️   Admin already exists: ${existing.email}`);
        console.log('    No changes made. To reset the password, delete the record manually.');
    } else {
        const admin = new Admin({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        });
        await admin.save();
        console.log(`🎉  Admin created successfully!`);
        console.log(`    Email:    ${ADMIN_EMAIL}`);
        console.log(`    Password: ${ADMIN_PASSWORD}`);
    }

    await mongoose.disconnect();
    console.log('🔌  Disconnected. Done.');
    process.exit(0);
}

seed().catch(err => {
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
});
