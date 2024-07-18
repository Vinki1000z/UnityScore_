import React, { useState, useContext, useEffect } from "react";
import UserPost from "./UserPost";
import Card from "./Card";
import EditUserName from "./EditUserName";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";

export default function ProfileView(props) {
  const { userId, GetUserProfile ,userInfo } = useContext(DashboardContext);
  const [show, setShow] = useState(false);
  // const [userId, setUserId] = useState();
  const [match, setMatch] = useState();
  // const [userProfile, setUserProfile] = useState({});
  const { style } = true;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUserNameEdit=()=>{
    // console.log("clicked");
    handleShow();
  }
  useEffect(() => {
    const fetchData = async () => {
      if (props.userId === userId) {
        setMatch(true);
      } else {
        setMatch(false);
      }
     GetUserProfile(props.userId);
    };

    fetchData();
     // eslint-disable-next-line
  }, [props.userId,userInfo]);
  

  return (
    <>
    {
      userInfo && (
        <>
        <div className="container">
        {/*  profile view */}
        <div
          className="container profile my-6 "
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="me-4">
            <div className="position-relative d-inline-block text-white">
              <img
                alt="profilePic"
                src="/img/Dashboard/profilePic.jpg"
                className="avatar rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />

              <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
            </div>
            {
              match && 
            <i
              className="fas fa-edit"
              style={{ position: "absolute", cursor: "pointer" }}
              variant="primary"
              onClick={handleUserNameEdit}
            ></i>
            }
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span
              className="d-block large-font mb-0"
              style={{ fontSize: "20px" }}
            >
              {userInfo.name}
            </span>
            <span
              className="d-block text-muted font-regular mb-0"
              style={{ fontSize: "16px" }}
            >
              {userInfo.userName}
            </span>
          </div>
        </div>
        {/* score view */}
        <Card
          style={{ style }}
          scores={userInfo.scores}
          achievements={userInfo.achievements}
        />
        {/* your post */}
        <UserPost style={{ style }} userId={props.userId}  match={match}/>
      </div>
      {show && (
        <EditUserName
          handleClose={handleClose}
          show={show}
          userId={props.userId}
        />
      )}

        </>
      )
    }
      
    </>
  );
}