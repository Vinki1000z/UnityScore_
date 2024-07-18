import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";

export default function CommentModal(props) {
  const { CreateComment, DeleteComment } = useContext(DashboardContext);
  const [newComment, setNewComment] = useState({ content: "" });

  const handleonchange = (e) => {
    setNewComment({ ...newComment, [e.target.id]: e.target.value });
  };

  const handleonSubmit = (e) => {
    e.preventDefault();
    if (newComment.content.length < 1) {
      return; // Prevent submission if the content is less than 1 character
    }
    CreateComment(props.postId, newComment);
    setNewComment({ content: "" });
  };

  const handleonDelete = (postId, commentId) => {
    DeleteComment(postId, commentId);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} className="mb-0">
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 my-3">
            <label htmlFor="content" className="form-label mb-0">
              Add Comment
            </label>
            <input
              type="text"
              className={`form-control ${
                newComment.content.length < 1 ? "is-invalid" : "is-valid"
              }`}
              id="content"
              name="content"
              value={newComment.content}
              onChange={handleonchange}
              placeholder="Enter Your Comment"
            />
            {newComment.content.length < 1 && (
              <div className="invalid-feedback">
                Comment must be at least 1 character.
              </div>
            )}
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleonSubmit}
              disabled={newComment.content.length < 1}
            >
              Post Comment
            </Button>
          </Modal.Footer>
          <div className="mb-3 my-7">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label mb-0"
            >
              All Comments
            </label>
            <div>
              {props.comments === undefined ? (
                <p>No comments Yet</p>
              ) : (
                <ul style={{ listStyleType: "none", padding: "0px" }}>
                  {props.comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="nav-item"
                      style={{ borderBottom: "2px solid rgb(236, 238, 243)" }}
                    >
                      <div
                        className="nav-link d-flex align-items-center my-2"
                        style={{ padding: "0px" }}
                      >
                        {/* Profile Info */}
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
                            {comment.userId.name}
                          </span>
                        </div>
                        {comment.userId._id === props.userId && (
                          <i
                            className="fa fa-trash mx-10"
                            aria-hidden="true"
                            alt="delete the comment"
                            onClick={() =>
                              handleonDelete(props.postId, comment._id)
                            }
                            style={{ cursor: "pointer" }}
                          ></i>
                        )}
                      </div>
                      {/* Comment Text */}
                      <div className="mx-3">{comment.content}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}