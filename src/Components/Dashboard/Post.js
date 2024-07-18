import React,{useEffect,useContext, useState} from "react";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";
import CommentModal from "./CommentModal";
import { Link } from "react-router-dom";

export default function Post(props) {  
  // console.log(props.singlePost)
  const baseUrl = "http://localhost:5000";
  const imagePath = new URL(props.singlePost.image, baseUrl).href;
  const { LikePost,UnLikePost,IsLikedPost,AllComments} = useContext(DashboardContext);
  const [currLiked,setCurrLiked]=useState();
  const [likeCount, setLikeCount] = useState(props.singlePost.likesId.length);
  const [comment,setComment]=useState();
  const [showCommentModal,setShowCommentModal]=useState(false);
  const handleClose = () => setShowCommentModal(false);
  const handleShow = () => setShowCommentModal(true);

  const handleLikePost=(PostId)=>{
    LikePost(PostId);
    setCurrLiked(true);
    setLikeCount(likeCount+1);
  }

  const handleUnLikePost=(PostId)=>{
    UnLikePost(PostId);
    setCurrLiked(false);
    setLikeCount(likeCount-1);
  }


  useEffect(() => {
    const checkIfLiked = async () => {
      const response = await IsLikedPost(props.singlePost._id);
      setCurrLiked(response);
    };
    const getComment=async()=>{
      const response=await AllComments(props.singlePost._id);
      setComment(response.comments);
      // console.log("this is response",response.comments ,props.singlePost._id);
    }
    checkIfLiked();
    getComment();
    // eslint-disable-next-line 
  }, [props.singlePost.commentsId.length]);

  return (
    <>
      <div
        className="my-10"
        style={
          props.showUpdate ? { display: "flex", flexDirection: "row" } : {}
        }
      >
        <div
          className="card"
          style={{
            maxWidth: props.width,
            backgroundColor: "#f5f9fc",
            margin: "20px",
            border: "2px solid #ECEEF3",
          }}
        >
          {/* Header */}
          <div className="postHeader">
            <Link to={`/profile/${props.singlePost.userId._id}`} className="nav-link d-flex align-items-center">
              <div className="me-4">
                <div className="position-relative d-inline-block text-white">
                  <img
                    alt="Pic"
                    src='/img/Dashboard/profilePic.jpg'
                    className="avatar rounded-circle postProfilePic"
                    style={{ width: "58px", height: "58px" }}
                  />
                  <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                </div>
              </div>
              <div>
                <span
                  className="d-block text-sm font-semibold"
                  style={{ fontSize: "1rem" }}
                >
                  {props.singlePost.userId.name}
                </span>
                {/* <span className="d-block text-xs text-muted font-regular">
                  Paris, FR
                </span> */}
              </div>
            </Link>
          </div>
          {/* Body */}
          <div className="card-body">
            <h5 className="card-title">{props.singlePost.title}</h5>
            <p className="card-text">{props.singlePost.content}</p>
          </div>
          {/* img Box */}
          <div className="imgBox container">
            <img
              src={imagePath}
              className="card-img-top"
              style={{ borderRadius: "15px" }}
              alt="..."
            />
          </div>
          {/* card-bottom */}
          <div
            className="container card-bottom"
            style={{ margin: "13px 0px 11px 0px" ,display:"flex",flexDirection:"row"}}
          > 
            <div className="like" style={{display:"flex",flexDirection:"column",alignItems:'center',marginRight:"15px"}}>
              <img
                className="card-img-top img-fluid"
                alt="..."
                src={currLiked?"/img/Dashboard/likeFilled.png" : "/img/Dashboard/like.png"}
                onClick={!currLiked? ()=>handleLikePost(props.singlePost._id):()=>handleUnLikePost(props.singlePost._id)}
                
                style={{ width: "30px", height: "33px" ,cursor:"pointer"}}
          
              />
              <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto" style={{marginTop:"10px"}}>
                {likeCount}
              </span>
            </div>

            <div className="comments" style={{display:"flex",flexDirection:"column",alignItems:'center'}}>
              <img
                src="/img/Dashboard/comment.png"
                className="card-img-top"
                alt="..."
                style={{ width: "30px", height: "35px" ,cursor:"pointer"}}
                onClick={handleShow}
              />
              <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto" style={{marginTop:"10px"}}>
                {props.singlePost.commentsId.length}
              </span>
            </div>
          </div>
        </div>
        {props.showUpdate && (
          <i
            className="fa fa-close"
            onClick={() => props.setting(false, true)}
            style={{ cursor: "pointer" }}
          ></i>
        )}
      </div>
      {showCommentModal && <CommentModal postId={props.singlePost._id} userId={props.singlePost.userId._id} comments={comment} handleClose={handleClose} show={showCommentModal}/>}
    </>
  );
}