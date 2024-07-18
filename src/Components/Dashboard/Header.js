import React, { useContext, useState } from "react";
import AddPost from "./AddPost";
import { Link, useLocation } from "react-router-dom";
//  importing the context to showSearch

import HideCardContext from "../../createcontext/HideCardContext/HideCardContext";
import SearchModal from "./SearchModal";

export default function Header() {
  const location = useLocation();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const closeModal = (val) => {
    setPostModalOpen(val);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { handleShowCard } = useContext(HideCardContext);

  return (
    <>
      <header className="bg-surface-primary border-bottom pt-6">
        <div className="container-fluid">
          <div className="mb-npx">
            <div className="row align-items-center">
              <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                {/* Title */}
                <h1 className="h2 mb-0 ls-tight">Application</h1>
              </div>
              {/* Actions */}
              <div className="col-sm-6 col-12 text-sm-end fancy-btn open">
                <div className="mx-n1">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setPostModalOpen(true);
                    }}
                    className="btn d-inline-flex btn-sm btn-primary mx-1"
                  >
                    <span className=" pe-2">
                      <i className="bi bi-plus"></i>
                    </span>
                    <span>Create Post</span>
                  </a>
                </div>
              </div>
            </div>
            {/* Nav */}
            <ul className="nav nav-tabs mt-4 overflow-x border-0">
              <li className="nav-item ">
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}  onClick={()=>handleShowCard(true)}
                >
                  All Post
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  to="/yourPost"
                  className={`nav-link ${
                    location.pathname === "/yourPost" ? "active" : ""
                  }`} onClick={()=>handleShowCard(true)}
                >
                  Your Post
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
                  Search
                </div>
              </li>
            </ul>
          </div>
        </div>
        {postModalOpen && <AddPost closeModal={closeModal} />}
      </header>
        {show && <SearchModal show={show} handleClose={handleClose}/>}
    </>
  );
}
