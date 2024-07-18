const express = require("express");
const app = express();
const port = 5000;
// connecting the db
const connect = require("./db.js");
connect();

// cors setup
const cors=require("cors");
app.use(cors());

app.use("/Backend/upload/postImages",express.static(__dirname+'/upload/postImages'));


//  Point 1. add this
// Middleware to parse JSON bodies
app.use(express.json());
//  use routers

//  1 Authentication

// 1.1 SingUp //
app.use("/api/auth", require("./routers/auth/singUp.js"));

//  1.2 Google User Authentication
app.use("/api/auth",require("./routers/auth/googleAuth.js"))

//  1.3 Login
app.use("/api/auth",require("./routers/auth/logIn.js"))

//  1.4 UserVerification
app.use("/api/auth",require("./routers/auth/userVerification.js"))

//  1.5 For logout (Do it in the last)
// app.use("/api/auth",require("./routers/auth/logOut.js"))

// 2 Post //

// 2.1 Create a new post
app.use('/api/post', require("./routers/post/createPost.js"));

// 2.2 Get all posts
app.use('/api/post', require("./routers/post/showAllPost.js"));

// 2.3 Get a single post by ID
app.use('/api/post', require("./routers/post/showPostById.js"));

// 2.4 Update a post by ID
app.use('/api/post', require("./routers/post/updatePost.js"));

// 2.5 Delete a post by ID
app.use('/api/post', require("./routers/post/deletePost.js"));

// 2.5 show a post by user
app.use('/api/post', require("./routers/post/showPostByUser.js"));

// 3 Comments //

// 3.1 Create a new comment on a post
app.use('/api/comment', require("./routers/comment/createComment.js"));

// 3.2 Get comments for a post
app.use('/api/comment', require("./routers/comment/getComment.js"));

// 3.2 Delete comments for a post
app.use('/api/comment', require("./routers/comment/deleteComment.js"));

// 3.3 
app.use('/api/comment', require("./routers/comment/postComments.js"));

// 3 Like //

// 3.1 Like a post
app.use('/api/like', require("./routers/like/likePost.js"));

// 3.2 Unlike a post
app.use('/api/like', require("./routers/like/unLikePost.js"));

// 3.3 is liked post
app.use('/api/like', require("./routers/like/isLikedPost.js"));

// 4 Profile //

// 4.1 user info
app.use('/api/user', require("./routers/user/userInfo.js"));

// 4.2 user info By Name search
app.use('/api/user', require("./routers/user/allUsersByName.js"));

// 4.3 update the score (in future for the admin dashbord )
// app.use('/api/user', require("./routers/user/updateScore.js"));

// 4.4 update the score (in future for the admin dashbord )
app.use('/api/user', require("./routers/user/updateUserName.js"));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  // update the username
  // achievemnet functionality