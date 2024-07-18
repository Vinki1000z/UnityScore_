const express = require("express");
const router = express.Router();
// models

// Middleware
const userVerification = require("../../middleware/userVerification.js");

//  schema
const Post = require("../../models/post_schema.js");
const Comment = require("../../models/comment_schema.js");
const User = require("../../models/users_schema.js");
// Success Varaible
let success = false;
router.delete("/:postId/deleteComment/:commentId", userVerification, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res.json({ msg: "Post Not Found", success });
    }

    const commentId = req.params.commentId;
    const userId = req.user.id;
    
    const comment = await Comment.findById(commentId);
    
    // Check if the comment exists
    if (!comment) {
        return res.json({msg:"Comment not found",success:false});
    }

    // Check if the user is the owner of the comment or the post
    // both the comment owner and the post owner have permission to delete the comment
    if (
      comment.userId.toString() !== userId.toString() &&
      post.userId.toString() !== userId.toString()
    ) {
        return res.json({msg:"User not authorized",success})
    }

    // Remove the comment from the post's comments array
    post.commentsId.pull(commentId);
    await post.save();

    // Remove the comment document from the Comment collection
    await Comment.findByIdAndDelete(commentId);

        // updating the score of the user on every post
        const score = -2; // Score change value (positive or negative)
        // Calculate new score ensuring it does not go below zero
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
    res.json({ msg: "Comment deleted", success , role:"success"});
  } catch (error) {
    res.json({ msg: error.message, success ,role:"warning"});
  }
});

module.exports = router;
