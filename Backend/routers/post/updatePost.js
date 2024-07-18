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
let success=false;
router.put(
  "/updatePost/:postId",
  userVerification,
  [
    // Validate content
    body("content")
      .isLength({ min: 4 })
      .withMessage("Content must be at least 4 characters long"),

    // Validate title
    body("title")
      .isLength({ min: 4 })
      .withMessage("Title must be at least 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let post = await Post.findById(req.params.postId);
      if (post.userId.toString() !== req.user.id) {
        return res.status(401).json({
          msg: "You are not allowed to update this Post",
          success
        });
      }
      if (!post) {
        return res.status(404).json({ msg: "Post Not Found", success });
      }
      let UpadtedPost = {};
      let { title, content } = req.body;
      if (title) {
        UpadtedPost.title = title;
      }
      if (content) {
        UpadtedPost.content = content;
      }
      UpadtedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        UpadtedPost,
        {
          new: true,
        }
      );
      res.json({ msg: "Post is Updated",UpadtedPost, role: "success" });
    } catch (error) {
      res.json({ msg: error.message,success });
    }
  }
);

module.exports = router;
