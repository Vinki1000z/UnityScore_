import React, { useState ,useContext} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";

export default function EditModal(props) {
  const {_id,title,content}=props.singlePost;
  const { UpdatePost } = useContext(DashboardContext);

  const [newPost,setnewPost]=useState({title,content});
  const handleOnChange=(e)=>{setnewPost({...newPost, [e.target.id]: e.target.value })}
  const handleonsave=()=>{
    UpdatePost(_id,newPost);
    props.handleClose();
  }
  // useEffect(() => {
  //   setnewPost({ title, content });
  // }, [props.singlePost.title,props.singlePost.content]);
  return (
    <Modal show={props.show} onHide={props.handleClose} className="mb-0">
      <Modal.Header closeButton>
        <Modal.Title>Edit Post </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div className="mb-3 my-3">
          <label htmlFor="" className="form-label mb-0">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Your Post Title"
            name="title"
            value={newPost.title}
            onChange={handleOnChange}
            
          />
        </div>
        <div className="mb-3 my-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label mb-0"
          >
            Description
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="3"
            placeholder="Enter Your Post Description"
            value={newPost.content}
            onChange={handleOnChange}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancle
        </Button>
        <Button variant="primary" onClick={handleonsave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
