const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const sendEmail = require('../middlewares/emailService.js');

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "user already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashed
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    await sendEmail(
      email,
      "Welcome to Auth Tutorial",
      `Welcome! Your account has been created: ${email}`
    );

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "server error" });
  }
};


// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "email and password required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: "server error" });
  }
};


// LOGOUT
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// SEND VERIFY OTP
const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id; // ⚠ requires auth middleware
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await sendEmail(user.email, "Verify OTP", `Your OTP is ${otp}`);

    res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user.id;

  if (!otp) return res.json({ success: false, message: "missing otp" });

  try {
    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: "not found" });
    if (user.verifyOtp !== otp) return res.json({ success: false, message: "invalid otp" });
    if (user.verifyOtpExpireAt < Date.now()) return res.json({ success: false, message: "expired" });

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "verified" });

  } catch (err) {
    return res.json({ success: false });
  }
};


// CHECK AUTH
const isAuthenticated = (req, res) => {
  return res.json({ success: true });
};


// SEND RESET OTP
const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ success: false, message: "email required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await sendEmail(email, "Reset Password OTP", `Your OTP: ${otp}`);

    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


// RESET PASSWORD
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.json({ success: false, message: "not found" });

    if (user.resetOtp !== otp) return res.json({ success: false, message: "invalid otp" });
    if (user.resetOtpExpireAt < Date.now()) return res.json({ success: false, message: "expired" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "password reset" });

  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


module.exports = {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
};