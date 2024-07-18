const express = require("express");
const router = express.Router();
// models

// Middleware
const userVerification = require("../../middleware/userVerification.js");

// importing express validators
const { body, validationResult } = require("express-validator");

//  schema
const Post = require("../../models/post_schema.js");
const Like = require("../../models/likes_schema.js");

// Success Varaible
let success = false;
router.post("/:postId/unLikePost", userVerification, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found", success });
    }

    const postId = req.params.postId;
    const userId = req.user.id;

    // Check if the post exists

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
    // Check if the user has already liked the post
    const like = await Like.findOne({ userId: userId, postId: postId });

    // if (!like) {
    //   return res.json({ msg: "Post not liked", success});
    // }

    // Remove the like from the post's likes array
    post.likesId.pull(like._id);
    await post.save();

    // Remove the like document from the Like collection
    await Like.findByIdAndDelete(like._id);

    success = true;
    res.status(201).json({ msg: "Post Unliked" ,unliked:false});
  } catch (error) {
    res.json({ msg: error.message, success });
  }
});

module.exports = router;
