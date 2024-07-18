import React, { useContext,useState ,useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import HideCardContext from "../../createcontext/HideCardContext/HideCardContext";
import SearchModal from "../Dashboard/SearchModal";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";
import IsAuthContext from "../../createcontext/IsAuth/IsAuthContext";

export default function Navbar() {
  const {auth ,handleAuth}=useContext(IsAuthContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();

    const {FindUserId,CurrUserProfile,currUser,userId} = useContext(DashboardContext);
    useEffect(()=>{
      if(auth){

      
    const getUserId=async()=>{
   FindUserId();

    // console.log(userId);
    // console.log("here");
    CurrUserProfile(userId);
  
  // console.log("here");
  }
  getUserId();
}
  // eslint-disable-next-line
},[currUser,userId,auth])
  const { handleShowCard } = useContext(HideCardContext);
  const handleOnLogOut=()=>{
    localStorage.removeItem('token');

    handleAuth(false);
  }
  return (
    <>
    { auth &&
       currUser && (
        <>

        
      <nav
        className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
        id="navbarVertical"
      >
        <div className="container-fluid">
          {/* Toggler  */}
          <button
            className="navbar-toggler ms-n2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapse"
            aria-controls="sidebarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Brand */}
          <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="/">
            <img
              src="https://preview.webpixels.io/web/img/logos/clever-primary.svg"
              alt="..."
            />
          </a>
          {/* User menu (mobile) */}
          <div className="navbar-user d-lg-none">
            {/* Dropdown */}
            <div className="dropdown">
              {/* Toggle */}
              <a
                href="/"
                id="sidebarAvatar"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="avatar-parent-child">
                  <img
                    alt="Pic"
                    src="/img/Dashboard/profilrPic.jpg"
                    className="avatar avatar- rounded-circle"
                  />
                  <span className="avatar-child avatar-badge bg-success"></span>
                </div>
              </a>
              {/* Menu */}
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="sidebarAvatar"
              >
                <a href="/" className="dropdown-item">
                  Profile
                </a>
                {/* <a href="/" className="dropdown-item">Settings</a> */}
                <a href="/" className="dropdown-item">
                  Logout
                </a>
              </div>
            </div>
          </div>
          {/* Collapse */}

          {/*  herer add the active class according to the page */}
          <div className="collapse navbar-collapse" id="sidebarCollapse">
            {/* Navigation */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/home"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`} onClick={()=>handleShowCard(true)}
                >
                  <i className="bi bi-house"></i> Dashboard
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  to="/yourPost"
                  className={`nav-link ${
                    location.pathname === "/yourPost" ? "active" : ""
                  }`} onClick={()=>handleShowCard(true)}
                >
                  <i className="bi bi-house"></i> Your Post
                </Link>
              </li> */}
              <li className="nav-item">
                <div
                  className="nav-link"
                  href={location.pathname}
                  variant="primary"
                  onClick={handleShow}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-search"></i>Search
                </div>
              </li>
            </ul>

            {/* Push content down */}
            <div className="mt-auto"></div>
            {/* User (md) */}
            <ul className="navbar-nav">
              {/*  profile section  */}
              <li className="nav-item">
                {/* here i need to append the profile info  */}
                <Link
                  to={`/profile/${userId}`}
                  className={`nav-link d-flex align-items-center ${
                    location.pathname === `/profile/${userId}` ? "active" : ""
                   
                  }`}  onClick={()=>handleShowCard(false)}
                >
                  <div className="me-4">
                    <div className="position-relative d-inline-block text-white">
                      <img
                        alt="Pic"
                        src="/img/Dashboard/profilePic.jpg"
                        className="avatar rounded-circle"
                      />
                      <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="d-block text-sm font-semibold">
                    {currUser.name}
                    </span>
                    <span className="d-block text-xs text-muted font-regular">
                    {currUser.userName}
                    </span>
                  </div>
                </Link>
              </li>
              {/* logout */}
              <li className="nav-item">
                <Link className="nav-link" onClick={handleOnLogOut} to="/login">
                  <i className="bi bi-box-arrow-left" ></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      {show && <SearchModal show={show} handleClose={handleClose}/>}
      </nav>
      </>
      )
    }
    </>
    
  );
  
}