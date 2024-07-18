import React,{useState,useContext,useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";
import { Link } from "react-router-dom";
export default function SearchModal(props) {
  const [searchInput, setSearchInput] = useState("");
  const { SearchByName, userNames  ,ClearUserNames} = useContext(DashboardContext);

  // const [searchResults, setSearchResults] = useState([]);

  // // Sample data to simulate search results
  // const users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'];
  useEffect(() => {
    if (searchInput) {
      SearchByName(searchInput);
    }
  }, [searchInput, SearchByName]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleOnClose=()=>{
    props.handleClose();
    setSearchInput("");
    ClearUserNames();
  }
  const handleOnLink=()=>{
    props.handleClose();
  }
  return (
    <>
      <Modal show={props.show} onHide={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="userName"
              id="userName"
              onChange={handleInputChange}
              style={{ borderRadius: "20px" }}
            />
          </form>
        </Modal.Body>
        {/* i will append all the similar users here */}
        <div>
          {userNames.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: "0px" }}>
              {userNames.map((user) => (
                <li
                  key={user._id}
                  className="nav-item mx-6"
                  style={{ borderBottom: "2px solid rgb(236, 238, 243)" }}
                > 
                <Link  to={`/profile/${user._id}`} onClick={handleOnLink}>
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
                          style={{width:"60px",height:"60px"}}
                        />
                        <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                      </div>
                    </div>
                    <div>
                      <span className="d-block text-sm font-semibold">
                        {user.name}
                      </span>
                      <span className="d-block text-sm font-semibold">
                        {user.userName}
                      </span>                      
                    </div>
                  </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <>
            <div className="constiner mb-0 mx-2" style={{display:"flex",flexDirection:"column", alignItems:"center"}}> <p className="container  my-3 ">No Users Found</p></div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
