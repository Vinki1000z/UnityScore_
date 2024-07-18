const express = require("express");
const router = express.Router();
// models


// Middleware
const userVerification = require("../../middleware/userVerification.js");


//  schema
const Post = require("../../models/post_schema.js");
const Comment = require("../../models/comment_schema.js");


// Success Varaible
let success=false;
router.get(
  "/:postId/getComment",
  userVerification,
  async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: "Post Not Found", success });
        }
        const postId = req.params.postId;
        const comments = await Comment.find({ postId: postId }).sort({ createdAt: -1 }).populate('userId', 'name email');
        success=true;
        if(comments.length===0){
            return res.json({ msg: "No Comments yet", success });
        }
        res.json({msg:"These are the Comments on the post",comments,success});
    } catch (error) {
      res.json({ msg: error.message,success });
    }
  }
);

module.exports = router;
