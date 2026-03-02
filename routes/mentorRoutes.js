const express = require('express');
const { getMentors,getMentorById } = require('../controllers/mentorController.js');
// const userAuth = require('../middleware/userAuth.js');

const mentorRouter = express.Router();

mentorRouter.get('/mentor-data', getMentors);
mentorRouter.get('/mentor-data/:id', getMentorById);

module.exports = mentorRouter;
