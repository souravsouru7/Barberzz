const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    isVerified: Boolean,
    profileImage: String,
    otp: String,           
    otpExpires: Date,
    favoriteShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
});

const UserModel = mongoose.model('User', userSchema);


module.exports =UserModel