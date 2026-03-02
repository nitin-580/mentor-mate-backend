const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },          // ✅ spelling fix (reserOtp → resetOtp)
    resetOtpExpireAt: { type: Number, default: 0 }    // ✅ spelling fix
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = userModel;
