import React, { useContext, useState } from "react";
import DashboardContext from "./DashboardContext";
import Alertcontext from "../Alert/AlertContext";
export default function DashboardState(props) {
const network = "http://localhost:5000";
  const {showalert}=useContext(Alertcontext);

  // posts state
  const [Posts, setPost] = useState([]);
  // isLikedPost state
  const [isLiked, setIsLiked] = useState();
  //  post user specific
  const [postUser, setPostUser] = useState([]);
  //  User Info
  const [userInfo,setUserInfo]=useState([]);
  //  UsersByName
  const [userNames,setUserNames]=useState([]);
  //curr user
  const [currUser,setCurrUser]=useState([]);
  // user id
  const [userId,setUserId]=useState([]);
  //  Section For Post //

  //   1. For showing All Post
  const AllPost = async () => {
    const response = await fetch(`${network}/api/post/showAllPost`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setPost(data.posts);
  };

  // 2. Creating Post
  const CreatePost = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  
    const response = await fetch(`${network}/api/post/createPost`, {
      method: "POST",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YzIyYTA1ZGM0NDRhZDU0YmYyYmU2In0sImlhdCI6MTcyMDk2Njc3MX0.Bl95qcYeZEXqpGD88fCmJZ3IaVQfshRofyjRlv3-SxI"
      },
      body: formData
    });
  
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }
  
    const json = await response.json();
    // console.log(json);
    setPost(Posts.concat(json.post));
    showalert({grole:json.role,gshow:true,gmsg:json.msg})
  };

  //  3. Show post by userID
  const ShowPostByUserID = async (userId) => {
    const response = await fetch(`${network}/api/post/showPostByUser/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YzIyYTA1ZGM0NDRhZDU0YmYyYmU2In0sImlhdCI6MTcyMDk2Njc3MX0.Bl95qcYeZEXqpGD88fCmJZ3IaVQfshRofyjRlv3-SxI"
      },

    });
    const json = await response.json();
    setPostUser(json.posts);

  }

  // 4 . show post by postId
  const ShowPostByPostId = async (postId) => {
    const response = await fetch(`${network}/api/post/showPostById/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YzIyYTA1ZGM0NDRhZDU0YmYyYmU2In0sImlhdCI6MTcyMDk2Njc3MX0.Bl95qcYeZEXqpGD88fCmJZ3IaVQfshRofyjRlv3-SxI"
      },
    })
    const json = await response.json();
    console.log(json);
  }

  // 5. update post
  const UpdatePost = async (postId,{title,content}) => {
   
    const response = await fetch(`${network}/api/post/updatePost/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YzIyYTA1ZGM0NDRhZDU0YmYyYmU2In0sImlhdCI6MTcyMDk2Njc3MX0.Bl95qcYeZEXqpGD88fCmJZ3IaVQfshRofyjRlv3-SxI"
      },
      body:JSON.stringify({title,content})
    })
    const json = await response.json();
    showalert({grole:json.role,gshow:true,gmsg:json.msg})

  }

  //  6. delete a Post
  const DeletePost = async (postId) => {
    const response = await fetch(`${network}/api/post/deletePost/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YzIyYTA1ZGM0NDRhZDU0YmYyYmU2In0sImlhdCI6MTcyMDk2Njc3MX0.Bl95qcYeZEXqpGD88fCmJZ3IaVQfshRofyjRlv3-SxI"
      },
    })
    const json = await response.json();
    showalert({grole:json.role,gshow:true,gmsg:json.msg})
  }

  //  Section For Comments //

  // 1. For showing All Comments
  const AllComments=async(postId)=>{
    const response=await fetch(`${network}/api/comment/${postId}/getComment`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const data=await response.json();
    return data;
  }

  // 2. For Creating Comment
  const CreateComment=async(postId,content)=>{
    const response=await fetch(`${network}/api/comment/${postId}/createComment`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body:JSON.stringify(content)
      });
      const json=await response.json();
      if(json.success){
        showalert({grole:json.role,gshow:true,gmsg:json.msg})
      }
      else{
        showalert({grole:json.role,gshow:true,gmsg:json.msg})
      }
  }

  // 3. For deleting the Comment
  const DeleteComment=async(postId,commentId)=>{
    const response=await fetch(`${network}/api/comment/${postId}/deleteComment/${commentId}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json=await response.json();
    if(json.success){
      showalert({grole:json.role,gshow:true,gmsg:json.msg})
    }
    else{
      showalert({grole:json.role,gshow:true,gmsg:json.msg})
    }
  }

  //  Section For Likes  //

  //  1.Like post
  const LikePost = async (postId) => {
    const response = await fetch(`${network}/api/like/${postId}/LikePost`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setIsLiked(data.liked);
  };

  //  2.Dislike post

  const UnLikePost = async (postId) => {
    const response = await fetch(`${network}/api/like/${postId}/unLikePost`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setIsLiked(data.unliked);
  };

  // 3. is liked post
  const IsLikedPost = async (postId) => {
    const response = await fetch(`${network}/api/like/${postId}/isLikePost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const data = await response.json();

    return data.liked;
  };

  //  Section For the Profile of user //

  //  1. finding the user id with the help of userverfication route
  const FindUserId = async () => {
    const response = await fetch(`${network}/api/auth/userVerification`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    })
    const json = await response.json();


    setUserId(json.client._id);
  }

  //  2. get user profile info
  const GetUserProfile=async(userId)=>{
    const response = await fetch(`${network}/api/user/userInfo/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    })
    const json = await response.json();
    // console.log("state",json);
    setUserInfo(json.user);
  }

  // 3. update User Name
  const UpdateUserName = async (userName) => {
    const response = await fetch(`${network}/api/user/updateUserName`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ userName: userName }),
    })
    const json = await response.json();
    showalert({grole:json.role,gshow:true,gmsg:json.msg})
    // console.log(json);
  }
  // 4.
  const CurrUserProfile=async(userId)=>{
    const response = await fetch(`${network}/api/user/userInfo/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    })
    const json = await response.json();
    setCurrUser(json.user)
  }
  //  Section For Search //

  // 1. search
  const SearchByName=async(userName)=>{
    const response = await fetch(`${network}/api/user/allUsersByName?name=${userName} `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    })
    const json = await response.json();
    setUserNames(json.users);
  }

  const ClearUserNames=()=>{
    setUserNames([])
}

  return (
 
    <>
      <DashboardContext.Provider
        value={{
          // 1. Post(state) , Allpost , CreatePost , ShowPostByUserID , ShowPostByPostId , UpdatePost , DeletePost ,postUser(state)
          Posts,
          AllPost,
          CreatePost,
          ShowPostByUserID,
          postUser,
          ShowPostByPostId,
          UpdatePost,
          DeletePost,

          //   2. Likepost , unlikepost  , islikde
          LikePost,
          UnLikePost,
          isLiked,
          IsLikedPost,

          // 3. AllComments , CreateComment , DeleteComment
          AllComments,
          CreateComment,
          DeleteComment,

          // 4. GetUserProfile , FindUserId , UpdateUserName , userinfo(state)
          GetUserProfile,
          userInfo,
          FindUserId,
          userId,
          UpdateUserName,
          CurrUserProfile,
          currUser,
          
          // 5. Search , usernames(state)
          SearchByName,
          userNames,
          ClearUserNames
        }}
      >
        {props.children}
      </DashboardContext.Provider>
    </>
  );
}