const express = require("express");
const router = express.Router();
// models

// Middleware
const userVerification = require("../../middleware/userVerification.js");

// importing express validators
const { body, validationResult } = require("express-validator");

//  schema
const Post = require("../../models/post_schema.js");

// Success Varaible
let success = false;
router.get("/showPostById/:postId", userVerification, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId)
  .populate("userId", "name email")
  .populate({
    path: "commentsId",
    populate: {
      path: "userId",
      select: "name email",
    },
  })
  .populate("likesId.user", "name email");
    // if (post.userId.toString() !== req.user.id) {
    //   return res.status(401).json({
    //     msg: "You are not allowed to update this note",
    //     success,
    //   });
    // }
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found", success });
    }
    success = true;
    res.json({ msg: "Post By Id is Here", success, post });
  } catch (error) {
    res.json({ msg: error.message, success });
  }
});

module.exports = router;
