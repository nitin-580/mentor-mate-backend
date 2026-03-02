const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Routes
const profileRoutes = require("./routes/profileRoute");
const authRouter = require('./routes/authRoutes');
const mentorRouter = require("./routes/mentorRoutes");

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// CORS (Allow All)
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.json());
app.use(cookieParser());

// Main routes
app.use("/api", profileRoutes);
app.use('/api/mentor', mentorRouter);
app.use('/api/auth', authRouter);

// Test route
app.get('/', (req, res) => {
  res.send('🏥 Server API is running...');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});