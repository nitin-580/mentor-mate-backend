const mongoose = require('mongoose');

const { Schema } = mongoose;

const MentorSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profilePhoto: String,
    name: String,
    contactedClients: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
    exams: [
      {
        name: String,
        image: String,
        rank: String,
      },
    ],
    categories: [String],
    college: {
      name: String,
      state: String,
      city: String,
    },
    currentJob: {
      post: String,
      companyName: String,
      state: String,
      city: String,
    },
    experience: [
      {
        post: String,
        companyName: String,
        state: String,
        city: String,
      },
    ],
    bio: String,
    pricing: {
      amount: Number,
      currency: { type: String, default: 'INR' },
    },
    rating: { type: Number, default: 0 },
    pastRating: [Number],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewRated' }],
    videoLink: String,
    photos: [String],
    lastLogin: Date,
  },
  { timestamps: true }
);

// ❌ पहले user model check हो रहा था (galat)
// ✅ अब सही Mentor model check किया है
const Mentor = mongoose.models.Mentor || mongoose.model('Mentor', MentorSchema);

module.exports = Mentor;
