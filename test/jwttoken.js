require("dotenv").config(); // Load environment variables from .env
const jwt = require("jsonwebtoken");

/**
 * Generate JWT token from userId
 * Usage: node generateToken.js <userId>
 */
const generateToken = (userId) => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("❌ JWT_SECRET not found in .env file");
    process.exit(1);
  }

  const token = jwt.sign(payload, secret, { expiresIn: "7d" }); // valid for 7 days
  return token;
};

// CLI usage
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.log("Usage: node generateToken.js <userId>");
  process.exit(1);
}

const userId = args[0];
const token = generateToken(userId);
console.log("✅ Generated JWT Token:\n", token);
