const express = require("express");
const router = express.Router();
// Middleware
const userVerification = require("../../middleware/userVerification.js");

const User = require("../../models/users_schema.js"); // Replace with your user model

let success = false;
// Update user score by user ID
router.put("/updateScore", userVerification, async (req, res) => {
  try {
    const score = req.body.score; // Score change value (positive or negative)
    const userId = req.user.id;
    // Use findById to get the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate new score ensuring it does not go below zero
    const newScore = user.scores + score;
    if (newScore < 0) {
      return res.status(400).json({ message: "Score cannot go below zero" });
    }

    // Use findByIdAndUpdate to update the user score
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { scores: newScore },
      { new: true }
    );
    success=true;
    res.json({msg:"updated score",updatedUser,success});
  } catch (error) {
    res.json({ msg: error.message, success });
  }
});

module.exports = router;
