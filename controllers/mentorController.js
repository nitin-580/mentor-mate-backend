const Mentor = require("../models/mentor.js");

const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find()
      .select("userId name profilePhoto currentJob rating bio pricing categories")
      .sort({ rating: -1 }); // optional: sort by rating

    if (!mentors.length) {
      return res
        .status(404)
        .json({ success: false, message: "No mentors found" });
    }

    return res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    console.error("❌ Error fetching mentors:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};
const getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentor.findById(id).select(
      "userId name profilePhoto currentJob rating bio pricing categories"
    );

    if (!mentor) {
      return res
        .status(404)
        .json({ success: false, message: "Mentor not found" });
    }

    return res.status(200).json({
      success: true,
      data: mentor,
    });
  } catch (error) {
    console.error("❌ Error fetching mentor by ID:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};

module.exports = { getMentors, getMentorById };
