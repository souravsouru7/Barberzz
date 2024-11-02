// backend/src/infrastructure/db/models/ShopkeeperModel.js
const mongoose = require('mongoose');

const ShopkeeperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    googleId: { type: String },
    profileImage: { type: String } 
});

module.exports = mongoose.model('Shopkeeper', ShopkeeperSchema);
