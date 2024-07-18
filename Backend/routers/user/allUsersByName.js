const express = require('express');
const router = express.Router();
// Middleware
const userVerification = require("../../middleware/userVerification.js");

const User = require('../../models/users_schema.js'); // Replace with your user model

let success=false;
// GET user profile by ID
router.get('/allUsersByName', userVerification, async (req, res) => {
  try {
    let query = {};

    // Check if name query parameter is provided
    if (req.query.name) {
        query.$or = [
          { name: { $regex: req.query.name, $options: 'i' } }, // Search by name
          { userName: { $regex: req.query.name, $options: 'i' } } // Search by username
        ];
      }

    const users = await User.find(query).select('-password');
    success=true;
    res.status(200).json({msg:"This is the user",users,success});
  } catch (error) {
    res.json({ msg: error.message,success });
  }
});

module.exports = router;