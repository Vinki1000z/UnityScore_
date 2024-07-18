import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import EditModal from "./EditModal";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";

export default function UserPost(props) {
  const { ShowPostByUserID,postUser,DeletePost } = useContext(DashboardContext);
  const [show, setShow] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showTable, setShowTable] = useState(true);
  // const [selectedPost,setSelectedPost]=useState();
  const [viewPost, setViewPost] = useState({});
  const [editPost, setEditPost] = useState();
  const showEditBtn = props.match;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const AllUserPostRef = useRef([]);
  const setting = (val1, val2) => {
    setShowPost(val1);
    setShowTable(val2);
  };
  const baseUrl = "http://localhost:5000";

  const handleOnViewBtn = (val1, val2, singlePost) => {
    setting(val1, val2);
    setViewPost(singlePost);
    // console.log(singlePost);
  };
  const handleOnEditBtn = (singlePost) => {
    handleShow();
    setEditPost(singlePost);
  };
  const handleOnDelete=(id)=>{
    DeletePost(id);
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedUserId = await ShowPostByUserID(props.userId);
  //     AllUserPostRef.current = fetchedUserId; // Update ref's current value
  //     // console.log("fetchedUserId", AllUserPostRef.current);
  //     if (AllUserPostRef.length === 0) {
  //       setShowTable(false);
  //     } else {
  //       setShowTable(true);
  //     }
  //     console.log(AllUserPostRef.current);
  //   };
  //   fetchData();
  //   // eslint-disable-next-line
  // }, []);
  useEffect(() => {
    ShowPostByUserID(props.userId);
    // eslint-disable-next-line
  }, [postUser])
  
  return (
    <>
      <div
        className="card shadow border-0 mb-7"
        style={{ backgroundColor: props.style ? "#f5f9fc" : "white" }}
      >
        <div className="card-header">
          <h5 className="mb-0">Your Post</h5>
        </div>
        <div
          className="table-responsive"
          style={
            showPost
              ? {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }
              : {}
          }
        >
          {showTable && (
            <table className="table table-hover table-nowrap">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {postUser &&
                  postUser.map((singlePost) => (
                    <tr key={singlePost._id}>
                      <td>
                        <img
                          alt="..."
                          src={new URL(singlePost.image, baseUrl).href}
                          className="avatar avatar-sm rounded-circle me-2"
                        />
                        <a className="text-heading font-semibold" href="/">
                          {singlePost.title}
                        </a>
                      </td>
                      <td>
                        {new Date(singlePost.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-end">
                        <button
                          href="/"
                          // onClick={() => setting(true, false)}
                          onClick={() =>
                            handleOnViewBtn(true, false, singlePost)
                          }
                          className="btn btn-sm btn-neutral mx-2"
                        >
                          View
                        </button>
                        {/* Edit button */}
                        {showEditBtn && (
                          <button
                            href="/"
                            className="btn btn-sm btn-neutral mx-2"
                            variant="primary"
                            // onClick={handleShow}
                            onClick={() => handleOnEditBtn(singlePost)}
                          >
                            Edit
                          </button>
                        )}

                        {
                          props.match &&
                        <button
                          type="button"
                          className="btn btn-sm btn-square btn-neutral text-danger-hover"
                          onClick={()=>handleOnDelete(singlePost._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {showPost && (
            <Post
              width={"40rem"}
              showUpdate={true}
              setting={setting}
              singlePost={viewPost}
            />
          )}
        </div>
      </div>

      {show && (
        <EditModal
          handleClose={handleClose}
          singlePost={editPost}
          show={show}
        />
      )}
    </>
  );
}