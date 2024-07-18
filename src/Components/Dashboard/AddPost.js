import React, { useContext, useState } from "react";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";

export default function AddPost({ closeModal }) {
  const { CreatePost } = useContext(DashboardContext);
  const [post, setPost] = useState({ title: "", content: "", image: "" });
  const [errors, setErrors] = useState({ title: "", content: "" });

  // handle on change
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setPost((prevPost) => ({ ...prevPost, [name]: files[0] }));
    } else {
      setPost((prevPost) => ({ ...prevPost, [name]: value }));
      if (name === "title" || name === "content") {
        if (value.length < 5) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 5 characters long`,
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
      }
    }
  };

  const handleOnSubmit = () => {
    if (post.title.length < 5 || post.content.length < 5) {
      return;
    }
    const confirmPost = window.confirm("Are you sure you want to post this?");
    if (confirmPost) {
      closeModal(false);
      setPost({ title: "", content: "", image: "" });
      CreatePost(post);
    }
  };

  return (
    <>
      <div
        className="card shadow mb-7 container"
        style={{ marginTop: "20px", backgroundColor: "#f5f9fc", width: "90%" }}
      >
        <div className="card-header">
          <h5 className="mb-0">Create Post</h5>
        </div>
        <div className="table-responsive" style={{ alignItems: "center" }}>
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* body */}
            <div className="mb-3 my-3" style={{ width: "80%" }}>
              <label htmlFor="title" className="form-label mb-0">
                Title
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                id="title"
                name="title"
                minLength={5}
                placeholder="Enter Your Post Title"
                onChange={handleOnChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="mb-3 my-3" style={{ width: "80%" }}>
              <label
                htmlFor="content"
                className="form-label mb-0"
              >
                Content
              </label>
              <textarea
                className={`form-control ${errors.content ? "is-invalid" : ""}`}
                id="content"
                name="content"
                rows="3"
                placeholder="Enter Your Post Description"
                onChange={handleOnChange}
              ></textarea>
              {errors.content && (
                <div className="invalid-feedback">{errors.content}</div>
              )}
            </div>
            <div className="row mb-3 mb-0" style={{ alignItems: "center" }}>
              <label htmlFor="formFile" className="col-sm-2 col-form-label">
                Image
              </label>
              <div className="col-sm-10">
                <div className="mb-3 my-3">
                  <input
                    className="form-control"
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleOnChange}
                    accept="image/*" // Limit to only image files
                  />
                </div>
              </div>
            </div>
            {/* footer */}
            <div className="footer my-6">
              <button
                type="button"
                onClick={() => {
                  closeModal(false);
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
              <input
                className="btn btn-primary mx-3"
                onClick={handleOnSubmit}
                type="submit"
                value="Post"
                disabled={post.title.length < 5 || post.content.length < 5} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
