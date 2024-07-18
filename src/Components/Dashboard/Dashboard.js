import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";
import AllPost from "./AllPost";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import UserPost from "./UserPost";
import ProfileDashboard from "./ProfileDashboard";

import HideCardContext from "../../createcontext/HideCardContext/HideCardContext";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";
import Login from "../Auth/Login";
import IsAuthContext from "../../createcontext/IsAuth/IsAuthContext";
import SingUp from "../Auth/Signup";
export default function Dashboard() {
  // const { FindUserId, GetUserProfile , userInfo,currUser} = useContext(DashboardContext);
  const { currUser } = useContext(DashboardContext);
  const { showCard } = useContext(HideCardContext);
  const {auth ,handleAuth}=useContext(IsAuthContext)

  useEffect(() => {
    //  // eslint-disable-next-line
  }, [currUser,auth]);

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
      handleAuth(true);
    } else {
      handleAuth(false);
    }
    /* eslint-disable */
  }, []);

  return (
    <>
    
      <div className="h-screen flex-grow-1 overflow-y-lg-auto">
        {/* Header */}
        {
          auth && <Header />
        }
   
        <main className="py-6 bg-surface-secondary">
          <div className="container-fluid">
            {/* Card  */}
            {auth && showCard && (
              <Card
                scores={currUser.scores}
                achievements={currUser.achievements}
              />
            )}
            <div className="card shadow border-0 mb-7">
              <Routes>
                {/* Post */}
                <Route exact path="/home" element={<AllPost />} />

                {/* user own Post */}
                {/* <Route exact  path="/yourPost/" element={<UserPost />} /> */}

                {/*  fro profile  */}
                <Route
                  exact
                  path="/profile/:userId"
                  element={<ProfileDashboard />}
                />

               <Route exact path="/login" element={<Login />} />
               <Route exact path="/signup" element={<SingUp />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
