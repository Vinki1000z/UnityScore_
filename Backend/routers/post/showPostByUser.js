const express = require("express");
const router = express.Router();

// Middleware
const userVerification = require("../../middleware/userVerification.js");

//  schema
const Post = require("../../models/post_schema.js");

// Success Varaible
let success = false;
router.get("/showPostByUser/:userId", userVerification, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 }).populate("userId", "name");;

    // res.send(new_note);
    success = true;
    res.json({ msg: "All Posts Are Here", posts, success });
  } catch (error) {
    res.json({ msg: error.message, success });
  }
});

module.exports = router;
