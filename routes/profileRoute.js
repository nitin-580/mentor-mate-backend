const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

const upload = multer({ dest: "uploads/" });

router.post(
  "/update-profile",
  authMiddleware,
  upload.single("profilePhoto"),
  profileController.updateProfile
);

router.post(
  "/verify-email-otp",
  authMiddleware,
  profileController.verifyEmailOtp
);

module.exports = router;
