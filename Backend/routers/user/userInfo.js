const express = require('express');
const router = express.Router();
// Middleware
const userVerification = require("../../middleware/userVerification.js");

const User = require('../../models/users_schema.js'); // Replace with your user model

let success=false;
// GET user profile by ID
router.get('/userInfo/:userId', userVerification, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ msg: 'User not found',success });
    }
    success=true;
    res.status(200).json({msg:"This is the user",user,success});
  } catch (error) {
    console.error(error);
    res.json({ msg: error.message,success });
  }
});

module.exports = router;