const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Backend/upload/postImages');
  },
  // destination: '../../upload/postImages',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// for images

const upload = multer({ storage });

// Middleware
const userVerification = require("../../middleware/userVerification.js");

// importing express validators
const { body, validationResult } = require("express-validator");

//  schema
const Post = require("../../models/post_schema.js");
const User = require("../../models/users_schema.js"); 

// achievements 
const achievements = require("../achievements/achievements.js")

// Success Varaible
let success=false;
router.post(
  "/createPost",
 userVerification, upload.single('image'),
  [
    // Validate content
    body("content")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 4 characters long"),

    // Validate title
    body("title")
      .isLength({ min: 10 })
      .withMessage("Title must be at least 8 characters long"),
  ],
  async (req, res) => {
    // console.log(req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { content, title } = req.body;
      const image = req.file ? req.file.path : null;
      // console.log("image",image);
      // console.log(content);
      // console.log(title);
      const post = new Post({
        title,
        content,
        userId: req.user.id,
        image
      });

      await post.save();

      // updating the score of the user on every post
      const score = 10; // Score change value (positive or negative)
      // Calculate new score ensuring it does not go below zero
      const newScore = user.scores + score;

      // Use findByIdAndUpdate to update the user score
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { scores: newScore },
        { new: true }
      );

      user.achievements = achievements
      .filter(achievement => newScore >= achievement.score)
      .map(achievement => ({ 
        // score: achievement.score,
        title: achievement.title, 
        description: achievement.description, 
        date: new Date() 
      }));

      await user.save();
      // res.send(new_note);
      success=true;
      res.json({ msg: "Post Created Successfully", post,updatedUser,success,role:"success"});
    } catch (error) {
      res.json({ msg: error.message,success ,role:"warning"});
    }
  }
);

module.exports = router;
