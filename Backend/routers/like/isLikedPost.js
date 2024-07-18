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
let success=false;
router.get(
  "/:postId/isLikePost",
  userVerification,
  async (req, res) => {
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
          throw new Error('Post not found');
        }
      
        // Check if the user had liked the post
        const alreadyLiked = await Like.findOne({ userId: userId, postId: postId });
        success=true;
        if (alreadyLiked) {
        return res.json({ msg: "Post liked", success,liked:true});
        }else{
          return res.json({ msg: "Post not liked", success,liked:false});
        }
    } catch (error) {
      res.json({ msg: error.message,success,role:"success" });
    }
  }
);

module.exports = router;
