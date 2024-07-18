const express = require("express");
const router = express.Router();
// models

// Middleware
const userVerification = require("../../middleware/userVerification.js");

//  schema
const Post = require("../../models/post_schema.js");
const Like = require("../../models/likes_schema.js");
const Comment = require("../../models/comment_schema.js");
const User = require("../../models/users_schema.js");
// Success Varaible
let success = false;
router.delete("/deletePost/:postId", userVerification, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found", success });
    }
    if (post.userId.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "You are not allowed to delete this Post",
        success,
      });
    }
    // Delete associated likes and comments
    await Like.deleteMany({ postId: req.params.postId });
    await Comment.deleteMany({ postId: req.params.postId });

    // Delete the post
    await post.deleteOne();

    // updating the score of the user on every post
    const score = -10; // Score change value (positive or negative)
    // Calculate new score ensuring it does not go below zero
    const userId = req.user.id;
    const user = await User.findById(userId);
    const newScore = user.scores + score;
    let updatedUser;
    if (newScore < 0) {
      updatedUser= await User.findByIdAndUpdate(
        userId,
        { scores: 0 },
        { new: true }
      );
    }else{
      updatedUser= await User.findByIdAndUpdate(
        userId,
        { scores: newScore },
        { new: true }
      );
    }
    success = true;
    res.json({ msg: "Post removed", updatedUser, success ,role:"success"});
  } catch (error) {
    res.json({ msg: error.message, success,role:"warning" });
  }
});

module.exports = router;
