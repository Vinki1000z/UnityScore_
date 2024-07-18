import React, { useState ,useContext} from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";

export default function EditUserName(props) {
  const {UpdateUserName } = useContext(DashboardContext);
  const [newUserName,setNewUserName]=useState();
  // const [show, setShow] = useState(false);
  const handleOnChange=(e)=>{
    setNewUserName(e.target.value)
}
const handleOnSave=()=>{
  UpdateUserName(newUserName);
props.handleClose();

  // console.log("submited");
}
  return (
    <Modal show={props.show} onHide={props.handleClose} className="mb-0">
    <Modal.Header closeButton>
      <Modal.Title>Edit UserNmae </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {" "}
      <div className="mb-3 my-3">
        <label htmlFor="" className="form-label mb-0">
          UserName
        </label>
        <input
          type="text"
          className="form-control"
          id="userName"
          name="userName"
          onChange={handleOnChange}
          placeholder="Enter Your New User Name"
        />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Cancle
      </Button>
      <Button variant="primary" onClick={handleOnSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
