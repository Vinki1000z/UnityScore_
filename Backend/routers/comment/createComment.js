const express = require("express");
const router = express.Router();
// models

// Middleware
const userVerification = require("../../middleware/userVerification.js");

// importing express validators
const { body, validationResult } = require("express-validator");


//  schema
const Post = require("../../models/post_schema.js");
const Comment = require("../../models/comment_schema.js");
const User = require("../../models/users_schema.js"); 

// achievements 
const achievements = require("../achievements/achievements.js")

// Success Varaible
let success=false;
router.post(
  "/:postId/createComment",
  userVerification,
  [
    // Validate content
    body("content")
      .isLength({ min: 1 })
      .withMessage("Comment must be at least 1 characters long")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
        let post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: "Post Not Found", success });
        }
      const { content } = req.body;
      const  comment= new Comment({
        userId:req.user.id,
        postId:req.params.postId,
        content
      });
      await comment.save();
      post.commentsId.push(comment._id);
      await post.save();

      // updating the score of the user on every post
      const score = 2; // Score change value (positive or negative)
      // Calculate new score ensuring it does not go below zero
      const newScore = user.scores + score;
      // Use findByIdAndUpdate to update the user score
      await User.findByIdAndUpdate(
        userId,
        { scores: newScore },
        { new: true }
      );
      //  adding title
      user.achievements = achievements
      .filter(achievement => newScore >= achievement.score)
      .map(achievement => ({ 
        // score: achievement.score,
        title: achievement.title, 
        description: achievement.description, 
        date: new Date() 
      }));
      await user.save();
      success=true;
      res.json({ msg: "Comment on Post",post ,success,role:"success"});
    } catch (error) {
      res.json({ msg: error.message,success,role:"warning" });
    }
  }
);

module.exports = router;
